<script setup lang="ts">
const gameStore = useGameStore();
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

  <!-- Dam coordinates with neon glow lines and triangle arrowhead -->
  <g
    v-for="line in gameStore.dam.coordinates"
    :key="`${line.activePawn.x},${line.activePawn.y}`"
  >
    <!-- Get colors based on dam color -->
    <template v-if="true" v-bind:key="gameStore.dam.color">
      <!-- This is just to create a reactive binding for the colors -->
      <template v-if="gameStore.dam.color"></template>
    </template>

    <!-- Base thick glow line (64px) - normal direction -->
    <line
      :x1="line.activePawn.x"
      :y1="line.activePawn.y"
      :x2="line.target.x"
      :y2="line.target.y"
      :stroke="getDamArrowColors(gameStore.dam.color || 'red').outerGlow"
      stroke-width="64"
      stroke-linecap="round"
      class="opacity-40"
      filter="url(#glow)"
    />

    <!-- Middle glow line - normal direction -->
    <line
      :x1="line.activePawn.x"
      :y1="line.activePawn.y"
      :x2="line.target.x"
      :y2="line.target.y"
      :stroke="getDamArrowColors(gameStore.dam.color || 'red').innerGlow"
      stroke-width="40"
      stroke-linecap="round"
      class="opacity-60"
    />

    <!-- Core bright line - normal direction -->
    <line
      :x1="line.activePawn.x"
      :y1="line.activePawn.y"
      :x2="line.target.x"
      :y2="line.target.y"
      :stroke="getDamArrowColors(gameStore.dam.color || 'red').brightCore"
      stroke-width="16"
      stroke-linecap="round"
      class="opacity-80"
    />

    <!-- Bright white core - normal direction -->
    <line
      :x1="line.activePawn.x"
      :y1="line.activePawn.y"
      :x2="line.target.x"
      :y2="line.target.y"
      stroke="white"
      stroke-width="6"
      stroke-linecap="round"
      class="opacity-70"
    />

    <!-- Enhanced glowing triangle arrowhead -->
    <!-- Extra outer glow layer -->
    <polygon
      :points="getLargerTrianglePoints(line, 1.5)"
      :fill="getDamArrowColors(gameStore.dam.color || 'red').outerGlow"
      class="opacity-30"
      filter="url(#strongGlow)"
    />

    <!-- Outer glow layer -->
    <polygon
      :points="getLargerTrianglePoints(line, 1.2)"
      :fill="getDamArrowColors(gameStore.dam.color || 'red').middleGlow"
      class="opacity-40"
      filter="url(#glow)"
    />

    <!-- Middle glow layer with filter -->
    <polygon
      :points="getTrianglePoints(line)"
      :fill="getDamArrowColors(gameStore.dam.color || 'red').innerGlow"
      class="opacity-60"
      filter="url(#innerGlow)"
    />

    <!-- Inner bright layer -->
    <polygon
      :points="getTrianglePoints(line)"
      :fill="getDamArrowColors(gameStore.dam.color || 'red').brightCore"
      class="opacity-80"
      :stroke="getDamArrowColors(gameStore.dam.color || 'red').brightCore"
      stroke-width="2"
    />

    <!-- White core glow -->
    <polygon
      :points="getTrianglePoints(line)"
      :fill="getDamArrowColors(gameStore.dam.color || 'red').lightCore"
      class="opacity-90"
    />

    <!-- White highlight -->
    <polygon
      :points="getTrianglePoints(line)"
      fill="white"
      class="opacity-70"
      stroke="white"
      stroke-width="1"
      filter="url(#whiteGlow)"
    />
  </g>

  <!-- Filters for glow effects -->
  <defs v-html="glowFilters"></defs>
</template>
