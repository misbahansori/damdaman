<script setup lang="ts">
import type { Pawn } from "~/types/global";

const props = defineProps<{
  pawn: Pawn;
}>();

const emit = defineEmits<{
  clicked: [Pawn];
  removed: [Pawn];
}>();

const store = useGameStore();
const appConfig = useAppConfig();

const isActive = computed(() =>
  store.dam.color &&
  store.dam.coordinates.length === 0 &&
  store.dam.showBanner === false
    ? store.dam.color === props.pawn.color
    : store.activePawn?.x === props.pawn.x &&
      store.activePawn?.y === props.pawn.y,
);

const onClick = () => {
  if (store.dam.color === props.pawn.color) {
    emit("removed", props.pawn);
  } else {
    emit("clicked", props.pawn);
  }
};

const x = useMotionValue(props.pawn.x);
const y = useMotionValue(props.pawn.y);
const r = useMotionValue(40);

watch([props.pawn.x, props.pawn.y, isActive], () => {
  x.set(props.pawn.x);
  y.set(props.pawn.y);
  r.set(isActive ? 48 : 40);
});
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

  <text
    v-if="appConfig.debug"
    :x="pawn.x - 12"
    :y="pawn.y + 8"
    class="pointer-events-none fill-current text-center text-2xl text-white"
  >
    {{ pawn.id.toString().padStart(2, "0") }}
  </text>
</template>

<style scoped>
.highlight-none {
  -webkit-tap-highlight-color: transparent;
}
</style>
