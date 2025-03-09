import type {
  Color,
  Coordinate,
  Dam,
  DamCoordinate,
  Pawn,
} from "~/types/global";

export const useGameStore = defineStore("game", () => {
  const activePawn = ref<Pawn | null>(null);
  const dam = reactive<Dam>({
    color: null,
    coordinates: [],
    count: 0,
    showBanner: false,
  });
  const isAlone = ref(false);
  const numberOfTurns = ref(0);
  const pawnCoordinates = ref<Pawn[]>([
    { id: 1, x: 200, y: 100, color: "red" },
    { id: 2, x: 500, y: 100, color: "red" },
    { id: 3, x: 500, y: 225, color: "red" },
    { id: 4, x: 800, y: 100, color: "red" },
    { id: 5, x: 325, y: 225, color: "red" },
    { id: 6, x: 675, y: 225, color: "red" },
    { id: 7, x: 100, y: 400, color: "red" },
    { id: 8, x: 300, y: 400, color: "red" },
    { id: 9, x: 500, y: 400, color: "red" },
    { id: 10, x: 700, y: 400, color: "red" },
    { id: 11, x: 900, y: 400, color: "red" },
    { id: 12, x: 100, y: 600, color: "red" },
    { id: 13, x: 300, y: 600, color: "red" },
    { id: 14, x: 500, y: 600, color: "red" },
    { id: 15, x: 700, y: 600, color: "red" },
    { id: 16, x: 900, y: 600, color: "red" },
    { id: 17, x: 100, y: 1000, color: "blue" },
    { id: 18, x: 300, y: 1000, color: "blue" },
    { id: 19, x: 500, y: 1000, color: "blue" },
    { id: 20, x: 700, y: 1000, color: "blue" },
    { id: 21, x: 900, y: 1000, color: "blue" },
    { id: 22, x: 100, y: 1200, color: "blue" },
    { id: 23, x: 300, y: 1200, color: "blue" },
    { id: 24, x: 500, y: 1200, color: "blue" },
    { id: 25, x: 700, y: 1200, color: "blue" },
    { id: 26, x: 900, y: 1200, color: "blue" },
    { id: 27, x: 325, y: 1375, color: "blue" },
    { id: 28, x: 500, y: 1375, color: "blue" },
    { id: 29, x: 675, y: 1375, color: "blue" },
    { id: 30, x: 200, y: 1500, color: "blue" },
    { id: 31, x: 500, y: 1500, color: "blue" },
    { id: 32, x: 800, y: 1500, color: "blue" },
  ]);
  const suggestionPawns = ref<Coordinate[]>([]);
  const turn = ref<Color>("blue");

  const redPawnKillCount = computed(
    () =>
      16 - pawnCoordinates.value.filter((pawn) => pawn.color === "red").length,
  );
  const bluePawnKillCount = computed(
    () =>
      16 - pawnCoordinates.value.filter((pawn) => pawn.color === "blue").length,
  );

  const changeTurn = () => {
    activePawn.value = null;
    suggestionPawns.value = [];
    numberOfTurns.value = 0;
    turn.value = turn.value === "red" ? "blue" : "red";
  };

  const clearSuggestionPawns = () => {
    suggestionPawns.value = [];
  };

  const clearActivePawn = () => {
    activePawn.value = null;
  };

  const movePawn = (pawn: Pawn, coordinate: Coordinate) => {
    pawn.x = coordinate.x;
    pawn.y = coordinate.y;
  };

  const getEatenEnemy = (suggestion: Coordinate) => {
    if (!activePawn.value) return;

    const enemiesInContact = getEnemiesInContact(
      pawnCoordinates.value,
      activePawn.value,
      isAlone.value,
    );

    const eatenEnemy = enemiesInContact.filter((pawnCoordinate) => {
      if (!activePawn.value) return;
      return checkStraightLine([
        [activePawn.value.x, activePawn.value.y],
        [pawnCoordinate.x, pawnCoordinate.y],
        [suggestion.x, suggestion.y],
      ]);
    });

    return eatenEnemy;
  };

  const removePawns = (pawns: Pawn[]) => {
    pawns.forEach((pawn) => {
      const enemyIndex = pawnCoordinates.value.findIndex(
        (p) => p.x === pawn.x && p.y === pawn.y,
      );

      pawnCoordinates.value.splice(enemyIndex, 1);
    });
  };

  const checkPossibleDamCoordiates = () => {
    const pawnsInTheSameTeamExceptActivePawn = pawnCoordinates.value
      .filter((pawn) => pawn.color === turn.value)
      .filter(
        (pawn) =>
          !(pawn.x === activePawn.value?.x && pawn.y === activePawn.value?.y),
      );

    const possibleDamCoordinates = getDamCoordinates(
      pawnsInTheSameTeamExceptActivePawn,
      pawnCoordinates.value,
    );

    return possibleDamCoordinates;
  };

  const checkForDam = (
    possibleDamCoordinates: DamCoordinate[],
    eatenEnemy?: Pawn[],
  ) => {
    log({
      possibleDamCoordinates,
      eatenEnemy,
    });
    if (possibleDamCoordinates.length && !eatenEnemy?.length) {
      dam.showBanner = true;
      dam.count = 3;
      dam.coordinates = possibleDamCoordinates;
      dam.color = activePawn.value?.color ?? null;

      setTimeout(() => {
        dam.showBanner = false;
        setTimeout(() => {
          dam.coordinates = [];
        }, 2500);
      }, 2000);
    }
  };

  return {
    activePawn,
    dam,
    isAlone,
    numberOfTurns,
    pawnCoordinates,
    suggestionPawns,
    turn,
    changeTurn,
    redPawnKillCount,
    bluePawnKillCount,
    movePawn,
    clearSuggestionPawns,
    clearActivePawn,
    getEatenEnemy,
    removePawns,
    checkPossibleDamCoordiates,
    checkForDam,
  };
});
