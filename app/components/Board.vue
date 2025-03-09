<script setup lang="ts">
const store = useGameStore();
const appConfig = useAppConfig();
</script>

<template>
  <line
    v-for="line in boardLines"
    :x1="line.x1"
    :y1="line.y1"
    :x2="line.x2"
    :y2="line.y2"
    stroke="currentColor"
    :stroke-width="3"
    stroke-linecap="round"
    stroke-dasharray="6 6"
    class="text-white/50"
  />

  <text
    v-if="appConfig.debug"
    v-for="coordinate in boardCoordinate"
    :key="`${coordinate.x},${coordinate.y}`"
    :x="coordinate.x + 40"
    :y="coordinate.y + 20"
    class="fill-current text-base text-white"
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
    :stroke-width="64"
    stroke-linecap="round"
  />
</template>
