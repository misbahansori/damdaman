<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

interface Room {
  id: string;
  name: string;
  host: string;
  players: number;
  maxPlayers: number;
  createdAt: number;
}

const ws = ref<WebSocket | null>(null);
const username = ref<string>("");
const isConnected = ref<boolean>(false);
const rooms = ref<Room[]>([]);
const showCreateModal = ref<boolean>(false);
const newRoomName = ref<string>("");

// Form validation
const usernameError = ref<string>("");
const newRoomNameError = ref<string>("");

onMounted(() => {
  // Try to get a stored username
  const storedUsername = localStorage.getItem("damdaman_username");
  if (storedUsername) {
    username.value = storedUsername;
  }
});

// Connect to WebSocket server
const connectToServer = () => {
  // Validate username
  if (!username.value.trim()) {
    usernameError.value = "Please enter a username";
    return;
  }

  // Clear any previous errors
  usernameError.value = "";

  // Store username for future use
  localStorage.setItem("damdaman_username", username.value);

  // Connect to WebSocket
  const protocol = window.location.protocol === "https:" ? "wss://" : "ws://";
  const wsUrl = `${protocol}${window.location.host}/damdaman`;

  ws.value = new WebSocket(wsUrl);

  ws.value.onopen = () => {
    isConnected.value = true;
    console.log("Connected to WebSocket server");
  };

  ws.value.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log("Received message:", data);

      if (data.type === "CREATE_ROOM") {
        // Add new room to list
        rooms.value.push(data.data);

        // If we created this room, close the modal
        if (data.data.host === username.value) {
          showCreateModal.value = false;
          newRoomName.value = "";
        }
      }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };

  ws.value.onclose = () => {
    isConnected.value = false;
    console.log("Disconnected from WebSocket server");
  };

  ws.value.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
};

// Create a new room
const createRoom = () => {
  // Validate room name
  if (!newRoomName.value.trim()) {
    newRoomNameError.value = "Please enter a room name";
    return;
  }

  // Clear any previous errors
  newRoomNameError.value = "";

  if (ws.value && ws.value.readyState === WebSocket.OPEN) {
    const roomData: Room = {
      id: crypto.randomUUID(),
      name: newRoomName.value,
      host: username.value,
      players: 1,
      maxPlayers: 2,
      createdAt: Date.now(),
    };

    ws.value.send(
      JSON.stringify({
        type: "CREATE_ROOM",
        data: roomData,
      }),
    );
  }
};

// Join an existing room
const joinRoom = (roomId: string) => {
  if (ws.value && ws.value.readyState === WebSocket.OPEN) {
    // Navigate to the game room
    navigateTo(`/room/${roomId}`);
  }
};

// Cleanup on component unmount
onUnmounted(() => {
  if (ws.value) {
    ws.value.close();
  }
});

// SEO
useSeoMeta({
  title: "Damdaman - Game Lobby",
  description: "Create or join a game room to play Damdaman with friends",
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-indigo-900 to-black p-6 text-white"
  >
    <div class="mx-auto max-w-4xl">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <h1 class="text-3xl font-bold">Game Lobby</h1>
        <NuxtLink
          to="/"
          class="text-indigo-300 transition-colors hover:text-indigo-100"
        >
          Back to Home
        </NuxtLink>
      </div>

      <!-- Connection Form -->
      <div v-if="!isConnected" class="mb-8 rounded-lg bg-indigo-800/50 p-6">
        <h2 class="mb-4 text-xl font-medium">Enter Username to Connect</h2>
        <div class="flex flex-col gap-4 sm:flex-row">
          <div class="flex-grow">
            <input
              v-model="username"
              type="text"
              placeholder="Your Username"
              class="w-full rounded-lg border border-indigo-700 bg-indigo-950 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              @keyup.enter="connectToServer"
            />
            <p v-if="usernameError" class="mt-1 text-sm text-red-400">
              {{ usernameError }}
            </p>
          </div>
          <button
            @click="connectToServer"
            class="rounded-lg bg-indigo-600 px-6 py-2 font-medium transition-colors hover:bg-indigo-700"
          >
            Connect
          </button>
        </div>
      </div>

      <!-- Room List -->
      <div v-if="isConnected" class="mb-8">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-medium">Available Rooms</h2>
          <button
            @click="showCreateModal = true"
            class="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-indigo-700"
          >
            <span>Create Room</span>
            <span class="text-lg">+</span>
          </button>
        </div>

        <div
          v-if="rooms.length === 0"
          class="rounded-lg bg-indigo-800/30 p-8 text-center"
        >
          <p class="text-indigo-300">
            No game rooms available. Create one to get started!
          </p>
        </div>

        <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div
            v-for="room in rooms"
            :key="room.id"
            class="cursor-pointer rounded-lg bg-indigo-800/30 p-4 transition-colors hover:bg-indigo-800/50"
            @click="joinRoom(room.id)"
          >
            <div class="mb-2 flex items-start justify-between">
              <h3 class="text-lg font-medium">{{ room.name }}</h3>
              <span class="rounded-full bg-indigo-700 px-2 py-1 text-xs">
                {{ room.players }}/{{ room.maxPlayers }}
              </span>
            </div>
            <p class="mb-2 text-sm text-indigo-300">Host: {{ room.host }}</p>
            <p class="text-xs text-indigo-400">
              Created {{ new Date(room.createdAt).toLocaleTimeString() }}
            </p>
          </div>
        </div>
      </div>

      <!-- Connected as -->
      <div v-if="isConnected" class="text-sm text-indigo-300">
        Connected as
        <span class="font-medium text-white">{{ username }}</span>
      </div>
    </div>

    <!-- Create Room Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <div class="w-full max-w-md rounded-lg bg-indigo-900 p-6">
        <h2 class="mb-4 text-xl font-medium">Create New Room</h2>

        <div class="mb-4">
          <label for="roomName" class="mb-1 block text-sm text-indigo-300">
            Room Name
          </label>
          <input
            id="roomName"
            v-model="newRoomName"
            type="text"
            placeholder="Enter room name"
            class="w-full rounded-lg border border-indigo-700 bg-indigo-950 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            @keyup.enter="createRoom"
          />
          <p v-if="newRoomNameError" class="mt-1 text-sm text-red-400">
            {{ newRoomNameError }}
          </p>
        </div>

        <div class="flex justify-end gap-3">
          <button
            @click="showCreateModal = false"
            class="rounded-lg bg-indigo-800 px-4 py-2 text-sm transition-colors hover:bg-indigo-700"
          >
            Cancel
          </button>
          <button
            @click="createRoom"
            class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-indigo-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Modal animation could be added here */
</style>
