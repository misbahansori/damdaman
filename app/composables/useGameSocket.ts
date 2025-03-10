import type { Coordinate } from "~/types/global";

import type { Pawn } from "~/types/global";

const { data, send } = useWebSocket("/damdaman");

export const useGameSocket = () => {
  const store = useGameStore();
  const handlePawnClick = (pawn: Pawn) => {
    send(
      JSON.stringify({
        type: "PAWN_CLICKED",
        data: {
          id: pawn.id,
        },
      }),
    );

    onPawnClicked(pawn);
  };

  const handlePawnMoved = (coordinate: Coordinate) => {
    send(
      JSON.stringify({
        type: "PAWN_MOVED",
        data: { coordinate },
      }),
    );

    onPawnMoved(coordinate);
  };

  const handlePawnRemoved = (pawn: Pawn) => {
    send(
      JSON.stringify({
        type: "PAWN_REMOVED",
        data: { id: pawn.id },
      }),
    );

    onPawnRemoved(pawn);
  };

  watch(data, (newData) => {
    const payload = JSON.parse(newData);
    const handlers: Record<string, () => void> = {
      PAWN_CLICKED: () => {
        const pawn = store.pawnCoordinates.find(
          (pawn) => pawn.id === payload.data.id,
        );

        if (!pawn) return;

        onPawnClicked(pawn);
      },
      PAWN_MOVED: () => {
        onPawnMoved(payload.data.coordinate);
      },
      PAWN_REMOVED: () => {
        const pawn = store.pawnCoordinates.find(
          (pawn) => pawn.id === payload.data.id,
        );

        if (!pawn) return;

        onPawnRemoved(pawn);
      },
    };

    handlers[payload.type]?.();
  });

  watch(store.pawnCoordinates, (newPawns) => {
    const redPawns = newPawns.filter((pawn) => pawn.color === "red");
    const bluePawns = newPawns.filter((pawn) => pawn.color === "blue");

    if (redPawns.length === 0) {
      console.log("blue wins");
    }

    if (bluePawns.length === 0) {
      console.log("red wins");
    }
  });

  const onPawnClicked = (pawn: Pawn) => {
    if (store.numberOfTurns >= 1) return;

    if (store.dam.count > 0) return;

    store.activePawn = pawn;

    store.suggestionPawns = getSuggestionPawns(
      pawn,
      store.pawnCoordinates,
      store.isAlone,
    );
  };

  const onPawnRemoved = (pawn: Pawn) => {
    if (store.dam.count > 0) {
      store.removePawns([pawn]);

      store.dam.count--;
    }
  };

  watch(
    () => store.dam.count,
    (newCount) => {
      if (newCount <= 0) {
        store.resetDam();
        store.changeTurn();
      }
    },
  );

  const onPawnMoved = async (suggestion: Coordinate) => {
    if (!store.activePawn) return;

    const possibleDamCoordinates = store.checkPossibleDamCoordiates();

    const eatenEnemy = store.getEatenEnemy(suggestion);

    if (store.checkForDam(possibleDamCoordinates, eatenEnemy)) {
      const color = store.activePawn?.color;

      store.movePawn(store.activePawn, suggestion);
      store.clearActivePawn();
      store.clearSuggestionPawns();

      await store.performDam(color, possibleDamCoordinates);

      return;
    }

    if (eatenEnemy?.length) {
      store.removePawns(eatenEnemy);
    }

    store.clearSuggestionPawns();
    store.movePawn(store.activePawn, suggestion);

    if (eatenEnemy?.length) {
      store.checkForMoreEatSuggestion();

      if (store.suggestionPawns.length) return;
    }

    store.clearActivePawn();
    store.changeTurn();
  };

  return { handlePawnClick, handlePawnMoved, handlePawnRemoved };
};
