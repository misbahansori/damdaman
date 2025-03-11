export const useRoomStore = defineStore("room", () => {
  const availableRooms = ref<string[]>([]);

  const joinRoom = (roomId: string) => {
    availableRooms.value.push(roomId);
  };

  const leaveRoom = (roomId: string) => {
    availableRooms.value = availableRooms.value.filter((id) => id !== roomId);
  };

  return { availableRooms, joinRoom, leaveRoom };
});
