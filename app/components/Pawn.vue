<script setup lang="ts">
import type { Pawn } from "~/types/global";

const store = useGameStore();

const props = defineProps<{
  pawn: Pawn;
  isActive: boolean;
}>();

const emit = defineEmits<{
  (e: "click", pawn: Pawn): void;
  (e: "removePawn", pawn: Pawn): void;
}>();

function onClick() {
  if (store.dam.coordinates.length > 0) {
    if (
      store.dam.coordinates.some(
        (pawn) =>
          pawn.activePawn.x === props.pawn.x &&
          pawn.activePawn.y === props.pawn.y,
      )
    ) {
      emit("removePawn", props.pawn);
    }
    return;
  }

  emit("click", props.pawn);
}
</script>

<template>
  <circle
    :cx="pawn.x"
    :cy="pawn.y"
    fill="#000"
    :opacity="0"
    r="64"
    class="highlight-none cursor-pointer"
  />

  <circle
    :cx="pawn.x"
    :cy="pawn.y"
    r="40"
    class="highlight-none cursor-pointer"
    :class="{ 'pointer-events-none': pawn.color !== store.turn }"
    :fill="pawn.color === 'red' ? '#FF005C' : '#426AF5'"
    stroke="#fff"
    stroke-width="12"
    transition:fade={{ duration: 400, easing: cubicOut }}
  />
</template>

<style scoped>
.highlight-none {
  -webkit-tap-highlight-color: transparent;
}
</style>
