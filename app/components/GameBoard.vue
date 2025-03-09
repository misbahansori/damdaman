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

const handleSuggestionClick = async (suggestion: Coordinate) => {
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
    <div
      v-if="store.dam.showBanner"
      class="absolute inset-0 flex items-center justify-center"
    >
      <div
        class="flex w-full items-center justify-center py-5 shadow-2xl"
        :class="store.dam.color === 'red' ? 'bg-red-500/80' : 'bg-blue-500/80'"
      >
        <span
          class="drop-shadow-px text-4xl font-bold tracking-wide text-white"
        >
          DAM
        </span>
      </div>
    </div>
  </main>
</template>
