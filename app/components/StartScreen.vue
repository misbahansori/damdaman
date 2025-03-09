<script setup lang="ts">
import { useGameStore } from "~/stores/game";
import type { Pawn } from "~/types/global";

const store = useGameStore();

function startGame() {
  const pawnCoordinates: Pawn[] = [];

  // Initialize red pawns
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 2; y++) {
      pawnCoordinates.push({
        id: pawnCoordinates.length + 1,
        x,
        y,
        color: "red",
      });
    }
  }

  // Initialize blue pawns
  for (let x = 0; x < 8; x++) {
    for (let y = 6; y < 8; y++) {
      pawnCoordinates.push({
        id: pawnCoordinates.length + 1,
        x,
        y,
        color: "blue",
      });
    }
  }

  store.pawnCoordinates = pawnCoordinates;
}

startGame();
</script>

<template>
  <div
    v-if="!store.pawnCoordinates.length"
    class="absolute inset-0 flex items-center justify-center"
  >
    <div class="rounded-lg bg-white p-8 text-center shadow-lg">
      <h1 class="mb-4 text-4xl font-bold">Welcome to Damdaman</h1>
      <p class="mb-6 text-gray-600">
        A classic board game of strategy and skill
      </p>
      <button
        class="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-600"
        @click="startGame"
      >
        Start Game
      </button>
    </div>
  </div>
</template>
