<script setup lang="ts">
const store = useGameStore();
const { handlePawnClick, handlePawnMoved, handlePawnRemoved } = useGameSocket();
</script>

<template>
  <main class="mx-auto flex h-screen sm:max-w-xl">
    <div class="relative flex w-full py-6">
      <svg
        class="w-full"
        viewBox="0 0 1000 1600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Board />
        <Pawn
          v-for="pawn in store.pawnCoordinates"
          :key="pawn.id"
          :pawn="pawn"
          @clicked="handlePawnClick"
          @removed="handlePawnRemoved"
        />
        <SuggestionPawn
          v-for="suggestion in store.suggestionPawns"
          :key="`${suggestion.x},${suggestion.y}`"
          :coordinate="suggestion"
          @click="handlePawnMoved"
        />
      </svg>
    </div>
    <div
      v-if="store.dam.showBanner"
      class="absolute inset-0 flex items-center justify-center"
    >
      <div
        class="flex w-full items-center justify-center py-5 shadow-2xl"
        :class="store.dam.color === 'red' ? 'bg-red-500/80' : 'bg-blue-500/80'"
      >
        <span
          class="drop-shadow-px text-4xl font-bold tracking-wide text-white"
        >
          DAM
        </span>
      </div>
    </div>

    <!-- Winner Banner -->
    <div
      v-if="store.showWinBanner"
      class="absolute inset-0 flex items-center justify-center"
    >
      <div
        class="flex w-full flex-col items-center justify-center py-5 shadow-2xl"
        :class="store.winner === 'red' ? 'bg-red-500/80' : 'bg-blue-500/80'"
      >
        <span
          class="drop-shadow-px text-4xl font-bold tracking-wide text-white"
        >
          {{ store.winner === "red" ? "RED" : "BLUE" }} WINS!
        </span>
        <Button
          @click="store.resetGame"
          class="mt-5 h-auto rounded-lg bg-white px-8 py-2.5 text-base font-semibold shadow-md transition-all hover:bg-gray-100 hover:shadow-lg active:scale-95"
          :class="store.winner === 'red' ? 'text-red-600' : 'text-blue-600'"
        >
          Play Again
        </Button>
      </div>
    </div>
  </main>
</template>
