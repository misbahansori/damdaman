<script setup lang="ts">
import { buttonVariants } from "~/components/ui/button";

useSeoMeta({
  title: "Damdaman - Online Board Game",
  description:
    "Play Damdaman, an exciting multiplayer board game with friends online",
});

const joinRoom = async () => {
  const randomId = Math.random().toString(36).substring(2, 15);

  await navigateTo(`/play/${randomId}`);
};

const store = useRoomStore();

const { data } = useGameSocket();

watch(data, (newData) => {
  const payload = JSON.parse(newData);

  if (payload.type === "JOIN_ROOM") {
    store.joinRoom(payload.data.roomId);
  }
});
</script>

<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center p-6"
  >
    <h1 class="mb-4 text-6xl font-bold text-white">Damdaman</h1>
    <p class="mb-8 max-w-md text-center text-xl text-gray-200">
      A multiplayer board game where strategy meets fun
    </p>

    <div class="flex w-full max-w-xs flex-col gap-4">
      <Button size="lg" @click="joinRoom">Create Room</Button>
    </div>

    <div class="mt-8 flex w-full max-w-xs flex-col gap-4">
      <div
        v-for="room in store.availableRooms"
        :key="room"
        class="bg-background rounded-lg p-2 text-sm text-gray-300"
      >
        <div class="flex items-center justify-between gap-2 pl-2">
          <p class="text-foreground">{{ room }}</p>
          <NuxtLink
            :to="`/play/${room}`"
            :class="buttonVariants({ size: 'sm' })"
          >
            Join
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="mt-8 text-sm text-gray-300">
      <p>Challenge friends and compete in this classic board game!</p>
    </div>
  </div>
</template>
