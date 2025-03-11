<script setup lang="ts">
const route = useRoute();
const store = useGameStore();
const { joinRoom } = useGameSocket();

joinRoom(route.params.id as string);
</script>

<template>
  <div>
    <Transition name="fade" mode="out-in">
      <div
        v-if="store.turn === 'red'"
        class="absolute inset-x-0 top-0 h-4 bg-red-500"
      />
      <div v-else class="absolute inset-x-0 bottom-0 h-4 bg-blue-500" />
    </Transition>
    <div class="absolute top-12 left-6 flex flex-wrap gap-1">
      <svg
        class="h-6 w-6"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34.5 47H31V43.5C31 42.1227 29.8773 41 28.5 41C27.1227 41 26 42.1227 26 43.5V47H22V43.5C22 42.1227 20.8773 41 19.5 41C18.1227 41 17 42.1227 17 43.5V47H13.5C11.5679 47 10 45.4321 10 43.5V37.5C10 37.4622 10 37.4454 10.0006 37.4219L10.014 36.8863L9.57561 36.5785C4.31467 32.8842 1 27.2559 1 21C1 10.0766 11.1665 1 24 1C36.8335 1 47 10.0766 47 21C47 27.2542 43.6854 32.8806 38.3466 36.5745L37.9156 36.8728V37.3969C37.9156 37.5588 37.9536 37.6968 38 37.8044V43.5C38 45.4321 36.4321 47 34.5 47ZM15 17C11.1383 17 8 20.1383 8 24C8 27.8617 11.1383 31 15 31C18.8617 31 22 27.8617 22 24C22 20.1383 18.8617 17 15 17ZM33 31C36.8617 31 40 27.8617 40 24C40 20.1383 36.8617 17 33 17C29.1383 17 26 20.1383 26 24C26 27.8617 29.1383 31 33 31Z"
          fill="white"
          stroke="black"
          stroke-width="2"
        />
      </svg>
      <span class="border-black text-white">{{ store.redPawnKillCount }}</span>
    </div>
    <div class="absolute bottom-12 left-6 flex flex-wrap gap-1">
      <svg
        class="h-6 w-6"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34.5 47H31V43.5C31 42.1227 29.8773 41 28.5 41C27.1227 41 26 42.1227 26 43.5V47H22V43.5C22 42.1227 20.8773 41 19.5 41C18.1227 41 17 42.1227 17 43.5V47H13.5C11.5679 47 10 45.4321 10 43.5V37.5C10 37.4622 10 37.4454 10.0006 37.4219L10.014 36.8863L9.57561 36.5785C4.31467 32.8842 1 27.2559 1 21C1 10.0766 11.1665 1 24 1C36.8335 1 47 10.0766 47 21C47 27.2542 43.6854 32.8806 38.3466 36.5745L37.9156 36.8728V37.3969C37.9156 37.5588 37.9536 37.6968 38 37.8044V43.5C38 45.4321 36.4321 47 34.5 47ZM15 17C11.1383 17 8 20.1383 8 24C8 27.8617 11.1383 31 15 31C18.8617 31 22 27.8617 22 24C22 20.1383 18.8617 17 15 17ZM33 31C36.8617 31 40 27.8617 40 24C40 20.1383 36.8617 17 33 17C29.1383 17 26 20.1383 26 24C26 27.8617 29.1383 31 33 31Z"
          fill="white"
          stroke="black"
          stroke-width="2"
        />
      </svg>
      <span class="border-black text-white">{{ store.bluePawnKillCount }}</span>
    </div>
    <div
      class="absolute right-4 bottom-10 z-10 flex items-center justify-center"
    >
      <a
        href="https://github.com/misbahansori/damdaman"
        class="p-2"
        target="__blank"
      >
        <svg
          class="drop-shadow-px h-6 w-6 cursor-pointer fill-current text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z"
          />
        </svg>
      </a>
    </div>
    <GameBoard />
  </div>
</template>

<style>
.border-black {
  -webkit-text-stroke: 1px black;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
