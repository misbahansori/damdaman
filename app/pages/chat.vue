<script setup lang="ts">
import { randomUUID } from "uncrypto";

const { data, send } = useWebSocket("/_ws");

// State management
const messages = ref<
  Array<{
    type: string;
    user?: string;
    content?: string;
    message?: string;
    channel?: string;
  }>
>([]);
const availableChannels = ref<string[]>([]);
const currentChannel = ref("public");
const messageInput = ref("");

// Watch for WebSocket data
watch(data, (newData) => {
  if (!newData) return;

  const parsedData =
    typeof newData === "string" ? JSON.parse(newData) : newData;
  console.log("Received WebSocket data:", parsedData); // Debug log

  switch (parsedData.type) {
    case "MESSAGE":
      // Show messages for current channel
      if (parsedData.channel === currentChannel.value) {
        messages.value.push(parsedData);
      }
      break;
    case "SUBSCRIBED":
      messages.value.push({
        type: "SYSTEM",
        message: parsedData.message,
        channel: parsedData.channel,
      });
      break;
    case "USER_JOINED":
    case "USER_LEFT":
      if (parsedData.channel === currentChannel.value) {
        messages.value.push({
          type: "SYSTEM",
          message: `${parsedData.user} ${parsedData.type === "USER_JOINED" ? "joined" : "left"} the channel`,
          channel: currentChannel.value,
        });
      }
      break;
    case "ERROR":
      messages.value.push(parsedData);
      break;
    default:
      if (parsedData.message) {
        messages.value.push({
          ...parsedData,
          channel: parsedData.channel || currentChannel.value,
        });
      }
  }
});

// Methods
const createPrivateChannel = () => {
  const channelId = randomUUID();
  availableChannels.value.push(channelId);

  // Subscribe to the new channel
  send(
    JSON.stringify({
      type: "SUBSCRIBE",
      channelId,
    }),
  );

  // Switch to the new channel
  currentChannel.value = channelId;
  messages.value = [];

  // Notify public channel about new channel
  send(
    JSON.stringify({
      type: "CHAT",
      channel: "public",
      content: `New channel created: ${channelId.slice(0, 8)}`,
    }),
  );
};

const joinChannel = (channelId: string) => {
  send(
    JSON.stringify({
      type: "SUBSCRIBE",
      channelId,
    }),
  );
  currentChannel.value = channelId;
  messages.value = [];
};

const leaveChannel = (channelId: string) => {
  send(
    JSON.stringify({
      type: "UNSUBSCRIBE",
      channelId,
    }),
  );

  if (currentChannel.value === channelId) {
    switchToPublic();
  }

  // Remove channel from available channels
  availableChannels.value = availableChannels.value.filter(
    (id) => id !== channelId,
  );
};

const sendMessage = () => {
  if (!messageInput.value.trim()) return;

  const messageData = {
    type: "CHAT",
    channel: currentChannel.value,
    content: messageInput.value,
  };

  send(JSON.stringify(messageData));

  // Optimistically add message to UI
  messages.value.push({
    type: "MESSAGE",
    content: messageInput.value,
    channel: currentChannel.value,
    user: "You", // Temporary user display until server responds
  });

  messageInput.value = "";
};

// Switch to public channel
const switchToPublic = () => {
  currentChannel.value = "public";
  messages.value = []; // Clear messages when switching channels
};

// Initialize connection
onMounted(() => {
  // No need to request channel list as channels are managed client-side
});
</script>

<template>
  <div class="min-h-screen bg-[#1a1a1a] text-white">
    <div class="flex h-screen">
      <!-- Channels Sidebar -->
      <div class="flex w-64 flex-col gap-4 bg-[#2a2a2a] p-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">Channels</h2>
          <button
            @click="createPrivateChannel"
            class="rounded-md bg-blue-600 px-2 py-1 transition-colors hover:bg-blue-700"
          >
            New
          </button>
        </div>

        <!-- Public Channel -->
        <button
          @click="switchToPublic"
          class="w-full rounded-md px-3 py-2 text-left transition-colors"
          :class="
            currentChannel === 'public' ? 'bg-blue-600' : 'hover:bg-[#3a3a3a]'
          "
        >
          # Public
        </button>

        <!-- Private Channels -->
        <div class="flex flex-col gap-1">
          <div
            v-for="channel in availableChannels"
            :key="channel"
            class="group flex items-center"
          >
            <button
              @click="joinChannel(channel)"
              class="flex-1 rounded-l-md px-3 py-2 text-left transition-colors"
              :class="
                currentChannel === channel
                  ? 'bg-blue-600'
                  : 'hover:bg-[#3a3a3a]'
              "
            >
              # {{ channel.slice(0, 8) }}
            </button>
            <button
              @click="leaveChannel(channel)"
              class="rounded-r-md bg-red-600 px-2 py-2 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-700"
              title="Leave channel"
            >
              <span class="sr-only">Leave channel</span>
              ×
            </button>
          </div>
        </div>
      </div>

      <!-- Chat Area -->
      <div class="flex flex-1 flex-col">
        <!-- Channel Info -->
        <div
          class="flex items-center justify-between border-b border-[#3a3a3a] bg-[#2a2a2a] p-4"
        >
          <h3 class="font-semibold">
            #
            {{
              currentChannel === "public"
                ? "Public"
                : currentChannel.slice(0, 8)
            }}
          </h3>
          <div v-if="currentChannel !== 'public'" class="text-sm text-gray-400">
            Channel ID: {{ currentChannel }}
          </div>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-4">
          <div class="flex flex-col gap-2">
            <div
              v-for="(msg, index) in messages"
              :key="index"
              class="rounded-lg p-2"
              :class="{
                'bg-red-500/20': msg.type === 'ERROR',
                'bg-[#2a2a2a]': msg.type !== 'ERROR',
                'text-sm text-gray-400': msg.type === 'SYSTEM',
              }"
            >
              <div v-if="msg.user" class="text-sm text-blue-400">
                {{ msg.user }}
              </div>
              <div>
                {{ msg.content || msg.message }}
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="bg-[#2a2a2a] p-4">
          <form @submit.prevent="sendMessage" class="flex gap-2">
            <input
              v-model="messageInput"
              type="text"
              placeholder="Type a message..."
              class="flex-1 rounded-md bg-[#3a3a3a] px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
            <button
              type="submit"
              class="rounded-md bg-blue-600 px-4 py-2 transition-colors hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
