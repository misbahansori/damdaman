<script setup lang="ts">
import { useGameStore } from "~/stores/game";
import { Color, type Pawn } from "~/types/global";

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
        (pawn) => pawn.x === props.pawn.x && pawn.y === props.pawn.y,
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
  <g
    :transform="`translate(${pawn.x * 100 + 150}, ${pawn.y * 100 + 350})`"
    @click="onClick"
    class="cursor-pointer"
  >
    <circle
      r="35"
      :class="[
        'transition-colors duration-150',
        isActive ? 'stroke-emerald-500' : 'stroke-black',
        pawn.color === Color.RED ? 'fill-red-500' : 'fill-blue-500',
      ]"
      stroke-width="4"
    />
  </g>
</template>
