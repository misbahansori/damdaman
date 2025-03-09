<script setup lang="ts">
import type { Coordinate, Pawn } from "~/types/global";

const store = useGameStore();

const handlePawnClick = (pawn: Pawn) => {
  store.activePawn = pawn;
  store.suggestionPawns = getSuggestionPawns(
    pawn,
    store.pawnCoordinates,
    store.isAlone,
  );
  log("Pawn clicked", store.suggestionPawns);
};

const handlePawnRemoved = (pawn: Pawn) => {
  store.pawnCoordinates = store.pawnCoordinates.filter(
    (p) => p.x !== pawn.x && p.y !== pawn.y,
  );
};

const handleSuggestionClick = (suggestion: Coordinate) => {
  if (!store.activePawn) return;

  store.checkForDam();

  const eatenEnemy = store.getEatenEnemy(suggestion);

  if (eatenEnemy?.length) {
    store.removePawns(eatenEnemy);
  }

  store.clearSuggestionPawns();
  store.movePawn(store.activePawn, suggestion);

  store.clearActivePawn();
  store.changeTurn();
};
</script>

<template>
  <main class="mx-auto flex h-screen sm:max-w-xl">
    <div class="relative flex w-full py-6">
      <svg
        class="w-full"
        viewBox="0 0 1000 1600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Board />
        <Pawn
          v-for="pawn in store.pawnCoordinates"
          :key="`${pawn.x},${pawn.y}`"
          :pawn="pawn"
          @clicked="handlePawnClick"
          @removed="handlePawnRemoved"
        />
        <SuggestionPawn
          v-for="suggestion in store.suggestionPawns"
          :key="`${suggestion.x},${suggestion.y}`"
          :coordinate="suggestion"
          @click="handleSuggestionClick"
        />
      </svg>
    </div>
  </main>
</template>
