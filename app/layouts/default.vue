<script setup lang="ts">
useGameSocket();
</script>
<template>
  <div class="relative min-h-screen w-full items-center">
    <div
      class="absolute inset-0 -z-10 bg-[url(/img/wood-2.jpeg)] bg-[size:250px] bg-repeat"
    />
    <slot />
  </div>
</template>
