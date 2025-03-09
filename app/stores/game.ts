import type { Color, Dam, Pawn } from "~/types/global";

export const useGameStore = defineStore("game", () => {
  const activePawn = ref<Pawn | null>(null);
  const dam = ref<Dam>({
    color: null,
    coordinates: [],
    count: 0,
    showBanner: false,
  });
  const isAlone = ref(false);
  const numberOfTurns = ref(0);
  const pawnCoordinates = ref<Pawn[]>([]);
  const suggestionPaths = ref<Pawn[]>([]);
  const turn = ref<Color>("red");

  const redPawnKillCount = computed(
    () =>
      16 - pawnCoordinates.value.filter((pawn) => pawn.color === "red").length,
  );
  const bluePawnKillCount = computed(
    () =>
      16 - pawnCoordinates.value.filter((pawn) => pawn.color === "blue").length,
  );

  return {
    activePawn,
    dam,
    isAlone,
    numberOfTurns,
    pawnCoordinates,
    suggestionPaths,
    turn,
    redPawnKillCount,
    bluePawnKillCount,
  };
});
