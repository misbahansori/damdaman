<script setup lang="ts">
import type { Pawn } from "~/types/global";

const store = useGameStore();

const props = defineProps<{
  pawn: Pawn;
}>();

const emit = defineEmits<{
  clicked: [Pawn];
  removed: [Pawn];
}>();

const isActive = computed(
  () =>
    store.activePawn?.x === props.pawn.x &&
    store.activePawn?.y === props.pawn.y,
);

const onClick = () => {
  if (store.dam.color === props.pawn.color) {
    emit("removed", props.pawn);
  } else {
    emit("clicked", props.pawn);
  }
};
</script>

<template>
  <circle
    :cx="pawn.x"
    :cy="pawn.y"
    fill="#000"
    :opacity="0"
    :r="40"
    class="highlight-none cursor-pointer"
  />

  <circle
    @click="onClick"
    :cx="pawn.x"
    :cy="pawn.y"
    :r="isActive ? 48 : 40"
    class="highlight-none cursor-pointer"
    :class="{ 'pointer-events-none': pawn.color !== store.turn }"
    :fill="pawn.color === 'red' ? '#FF005C' : '#426AF5'"
    stroke="#fff"
    :stroke-width="12"
  />
</template>

<style scoped>
.highlight-none {
  -webkit-tap-highlight-color: transparent;
}
</style>
