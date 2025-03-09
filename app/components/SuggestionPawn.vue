<script setup lang="ts">
import type { Coordinate } from "~/types/global";

const props = defineProps<{
  coordinate: Coordinate;
}>();

const emit = defineEmits<{
  click: [Coordinate];
}>();

const store = useGameStore();
</script>

<template>
  <circle
    @click="emit('click', coordinate)"
    :cx="coordinate.x"
    :cy="coordinate.y"
    fill="#000"
    opacity="0"
    :r="64"
    class="highlight-none cursor-pointer"
  />

  <circle
    :cx="coordinate.x"
    :cy="coordinate.y"
    :r="40"
    class="highlight-none pointer-events-none cursor-pointer fill-current"
    :class="
      store.activePawn?.color === 'red' ? 'text-red-400' : 'text-blue-400'
    "
    stroke="#fff"
    opacity="0.7"
    stroke-width="12"
  />
</template>

<style scoped>
.highlight-none {
  -webkit-tap-highlight-color: transparent;
}
</style>
