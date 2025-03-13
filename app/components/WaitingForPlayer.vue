<script setup lang="ts">
const copyToClipboard = () => {
  navigator.clipboard.writeText(window.location.href);
};
</script>

<template>
  <div
    class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm"
  >
    <div class="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
      <h2 class="mb-4 text-2xl font-bold">Waiting for opponent</h2>
      <p class="mb-6 text-gray-600">
        Share the game URL with a friend to play together
      </p>

      <div class="mb-6 flex justify-center">
        <div class="flex gap-2">
          <div
            class="h-4 w-4 animate-[bounce_1s_infinite_0ms] rounded-full bg-blue-500"
          ></div>
          <div
            class="h-4 w-4 animate-[bounce_1s_infinite_200ms] rounded-full bg-blue-500"
          ></div>
          <div
            class="h-4 w-4 animate-[bounce_1s_infinite_400ms] rounded-full bg-blue-500"
          ></div>
        </div>
      </div>

      <div class="flex items-center justify-center space-x-2">
        <button
          class="inline-flex items-center rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600"
          @click="copyToClipboard"
        >
          <svg
            class="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V18M8 5C8 6.10457 8.89543 7 10 7H12C13.1046 7 14 6.10457 14 5M8 5C8 3.89543 8.89543 3 10 3H12C13.1046 3 14 3.89543 14 5M14 5H16C17.1046 5 18 5.89543 18 7V10"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Copy Link
        </button>
      </div>
    </div>
  </div>
</template>
