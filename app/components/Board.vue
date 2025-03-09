<script setup lang="ts">
import { useGameStore } from "~/stores/game";
import type { Pawn } from "~/types/global";
const store = useGameStore();

const emit = defineEmits<{
  (e: "click", x: number, y: number): void;
}>();

function onClick(x: number, y: number) {
  if (
    !store.suggestionPaths.some((path: Pawn) => path.x === x && path.y === y)
  ) {
    return;
  }

  emit("click", x, y);
}
</script>

<template>
  <line
    v-for="line in boardLines"
    :x1="line.x1"
    :y1="line.y1"
    :x2="line.x2"
    :y2="line.y2"
    stroke="#fff"
    stroke-linecap="round"
    stroke-dasharray="6 6"
  />
  <SuggestionPawn
    v-for="suggestion in store.suggestionPaths"
    :key="`${suggestion.x},${suggestion.y}`"
    :x="suggestion.x"
    :y="suggestion.y"
    @click="onClick(suggestion.x, suggestion.y)"
  />
  <text
    v-for="coordinate in boardCoordinate"
    :key="`${coordinate.x},${coordinate.y}`"
    :x="coordinate.x + 40"
    :y="coordinate.y + 20"
    class="fill-current text-sm text-white"
  >
    [{{ coordinate.x }},{{ coordinate.y }}]
  </text>

  <line
    v-for="line in store.dam.coordinates"
    :key="`${line.activePawn.x},${line.activePawn.y}`"
    :x1="line.activePawn.x"
    :y1="line.activePawn.y"
    :x2="line.target.x"
    :y2="line.target.y"
    class="stroke-current"
    stroke-width="64"
    stroke-linecap="round"
  />
</template>
