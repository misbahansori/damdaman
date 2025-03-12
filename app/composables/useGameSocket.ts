import type { Coordinate } from "~/types/global";

import type { Pawn } from "~/types/global";

const { data, send } = useWebSocket("/damdaman");

export const useGameSocket = () => {
  const store = useGameStore();
  const route = useRoute();

  /*
   * User Actions
   */
  const handlePawnClick = (pawn: Pawn) => {
    const payload: PawnClickedData = {
      type: "PAWN_CLICKED",
      data: {
        roomId: route.params.id as string,
        id: pawn.id.toString(),
      },
    };

    send(JSON.stringify(payload));

    onPawnClicked(pawn);
  };

  const handlePawnMoved = (coordinate: Coordinate) => {
    const payload: PawnMovedData = {
      type: "PAWN_MOVED",
      data: {
        roomId: route.params.id as string,
        coordinate,
      },
    };

    send(JSON.stringify(payload));

    onPawnMoved(coordinate);
  };

  const handlePawnRemoved = (pawn: Pawn) => {
    const payload: PawnRemovedData = {
      type: "PAWN_REMOVED",
      data: {
        roomId: route.params.id as string,
        id: pawn.id.toString(),
      },
    };

    send(JSON.stringify(payload));

    onPawnRemoved(pawn);
  };

  const joinRoom = (roomId: string) => {
    const payload: JoinRoomData = {
      type: "JOIN_ROOM",
      data: { roomId },
    };

    send(JSON.stringify(payload));
  };

  /*
   * Server Actions
   */
  watch(data, (newData) => {
    const payload: SocketData = JSON.parse(newData);

    if (payload.type === "PAWN_CLICKED") {
      const pawn = store.pawnCoordinates.find(
        (pawn) => pawn.id === Number(payload.data.id),
      );

      if (!pawn) return;

      onPawnClicked(pawn);
    }

    if (payload.type === "PAWN_MOVED") {
      onPawnMoved(payload.data.coordinate);
    }

    if (payload.type === "PAWN_REMOVED") {
      const pawn = store.pawnCoordinates.find(
        (pawn) => pawn.id === Number(payload.data.id),
      );

      if (!pawn) return;

      onPawnRemoved(pawn);
    }
  });

  watch(store.pawnCoordinates, (newPawns) => {
    const redPawns = newPawns.filter((pawn) => pawn.color === "red");
    const bluePawns = newPawns.filter((pawn) => pawn.color === "blue");

    if (redPawns.length === 0) {
      store.setWinner("blue");
    }

    if (bluePawns.length === 0) {
      store.setWinner("red");
    }
  });

  /*
   * Action Handlers
   */
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

  return {
    handlePawnClick,
    handlePawnMoved,
    handlePawnRemoved,
    joinRoom,
    data,
  };
};
