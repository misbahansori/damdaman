<script setup lang="ts">
const { data } = useWebSocket("/_ws");

const responses = ref<string[]>([]);

watch(data, (newData) => {
  if (newData) {
    responses.value.push(newData);
  }
});
</script>

<template>
  <div class="min-h-screen bg-[#1a1a1a] text-white">
    <div class="flex h-screen flex-col justify-between">
      <div class="flex-1 overflow-y-auto">
        <div class="flex flex-col gap-2 p-4">
          <div v-for="response in responses" :key="response">
            {{ response }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
