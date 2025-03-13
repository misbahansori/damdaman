const { ws, send } = useWebSocket("/damdaman");

export const useGameSocket = () => {
  const gameStore = useGameStore();
  const roomStore = useRoomStore();
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
    const activePawn = gameStore.activePawn;

    if (!activePawn) return;

    const payload: PawnMovedData = {
      type: "PAWN_MOVED",
      data: {
        roomId: route.params.id as string,
        pawn: activePawn,
        coordinate,
      },
    };

    send(JSON.stringify(payload));

    onPawnMoved(activePawn, coordinate);
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
  if (ws.value) {
    ws.value.onmessage = (event) => {
      const payload: SocketData = JSON.parse(event.data);

      if (payload.type === "PAWN_CLICKED") {
        const pawn = gameStore.pawnCoordinates.find(
          (pawn) => pawn.id === Number(payload.data.id),
        );

        if (!pawn) return;

        onPawnClicked(pawn);
      }

      if (payload.type === "PAWN_MOVED") {
        onPawnMoved(payload.data.pawn, payload.data.coordinate);
      }

      if (payload.type === "PAWN_REMOVED") {
        const pawn = gameStore.pawnCoordinates.find(
          (pawn) => pawn.id === Number(payload.data.id),
        );

        if (!pawn) return;

        onPawnRemoved(pawn);
      }

      if (payload.type === "JOIN_ROOM") {
        roomStore.joinRoom(payload.data.roomId);
      }
    };
  }

  watch(gameStore.pawnCoordinates, (newPawns) => {
    const redPawns = newPawns.filter((pawn) => pawn.color === "red");
    const bluePawns = newPawns.filter((pawn) => pawn.color === "blue");

    if (redPawns.length === 0) {
      gameStore.setWinner("blue");
    }

    if (bluePawns.length === 0) {
      gameStore.setWinner("red");
    }
  });

  /*
   * Action Handlers
   */
  const onPawnClicked = (pawn: Pawn) => {
    if (gameStore.numberOfTurns >= 1) return;

    if (gameStore.dam.count > 0) return;

    gameStore.activePawn = pawn;

    gameStore.suggestionPawns = getSuggestionPawns(
      pawn,
      gameStore.pawnCoordinates,
      gameStore.isAlone,
    );
  };

  const onPawnRemoved = (pawn: Pawn) => {
    if (gameStore.dam.count > 0) {
      gameStore.removePawns([pawn]);

      gameStore.dam.count--;
    }
  };

  watch(
    () => gameStore.dam.count,
    (newCount) => {
      if (newCount <= 0) {
        gameStore.resetDam();
        gameStore.changeTurn();
      }
    },
  );

  const onPawnMoved = async (pawn: Pawn, coordinate: Coordinate) => {
    if (!gameStore.activePawn) return;

    const possibleDamCoordinates = gameStore.checkPossibleDamCoordiates();

    const eatenEnemy = gameStore.getEatenEnemy(coordinate);

    if (gameStore.checkForDam(possibleDamCoordinates, eatenEnemy)) {
      const color = gameStore.activePawn?.color;

      gameStore.movePawn(gameStore.activePawn, coordinate);
      gameStore.clearActivePawn();
      gameStore.clearSuggestionPawns();

      await gameStore.performDam(color, possibleDamCoordinates);

      return;
    }

    if (eatenEnemy?.length) {
      gameStore.removePawns(eatenEnemy);
    }

    gameStore.clearSuggestionPawns();
    gameStore.movePawn(gameStore.activePawn, coordinate);

    if (eatenEnemy?.length) {
      gameStore.checkForMoreEatSuggestion();

      if (gameStore.suggestionPawns.length) return;
    }

    gameStore.clearActivePawn();
    gameStore.changeTurn();
  };

  return {
    handlePawnClick,
    handlePawnMoved,
    handlePawnRemoved,
    joinRoom,
    ws,
  };
};
