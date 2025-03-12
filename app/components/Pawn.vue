<script setup lang="ts">
import { TransitionPresets } from "@vueuse/core";

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

const x = ref(props.pawn.x);
const y = ref(props.pawn.y);
const r = ref(40);

const xOutput = useTransition(x, {
  duration: 200,
  transition: TransitionPresets.easeInOutSine,
});
const yOutput = useTransition(y, {
  duration: 200,
  transition: TransitionPresets.easeInOutSine,
});
const rOutput = useTransition(r, {
  duration: 100,
  transition: TransitionPresets.easeOutQuint,
});

watch([() => props.pawn.x, () => props.pawn.y], () => {
  x.value = props.pawn.x;
  y.value = props.pawn.y;
});

watch(isActive, () => {
  r.value = isActive.value ? 48 : 40;
});
</script>

<template>
  <circle
    :cx="xOutput"
    :cy="yOutput"
    fill="#000"
    :opacity="0"
    :r="rOutput"
    class="highlight-none cursor-pointer"
  />

  <circle
    @click="onClick"
    :cx="xOutput"
    :cy="yOutput"
    :r="rOutput"
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
