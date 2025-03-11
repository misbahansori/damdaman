const rooms = new Map<string, Set<string>>();

export default defineWebSocketHandler({
  open(peer) {
    peer.send(JSON.stringify({ type: "SYSTEM", message: `Welcome ${peer}!` }));
    peer.publish(
      "global",
      JSON.stringify({ type: "SYSTEM", message: `${peer} joined!` }),
    );
    peer.subscribe("global");
  },
  message(peer, message) {
    const data: SocketData = JSON.parse(message.text());

    switch (data.type) {
      case "PING":
        handlePing(peer);
        break;

      case "JOIN_ROOM":
        handleJoinRoom(peer, data);
        break;

      case "LEAVE_ROOM":
        handleLeaveRoom(peer, data);
        break;

      case "PAWN_CLICKED":
        handlePawnClicked(peer, data);
        break;

      case "PAWN_MOVED":
        handlePawnMoved(peer, data);
        break;

      case "PAWN_REMOVED":
        handlePawnRemoved(peer, data);
        break;
    }
  },
  close(peer) {
    peer.publish(
      "global",
      JSON.stringify({ type: "SYSTEM", message: `${peer} left!` }),
    );
  },
});

function handlePing(peer: any) {
  peer.send(
    JSON.stringify({
      type: "SYSTEM",
      message: "PONG",
    }),
  );
}

function handleJoinRoom(peer: any, data: JoinRoomData) {
  const roomId = data.data.roomId;

  if (rooms.has(roomId)) {
    rooms.get(roomId)?.add(peer.id);
  } else {
    rooms.set(roomId, new Set([peer.id]));
  }

  peer.subscribe(roomId);

  const payload = {
    type: "JOIN_ROOM",
    data: {
      roomId,
      players: Array.from(rooms.get(roomId) || []),
    },
  };

  peer.send(JSON.stringify(payload));
  peer.publish("global", JSON.stringify(payload));
}

function handleLeaveRoom(peer: any, data: LeaveRoomData) {
  peer.unsubscribe(data.data.roomId);
  peer.publish(
    "global",
    JSON.stringify({
      type: "LEAVE_ROOM",
      data: data.data,
    }),
  );
}

function handlePawnClicked(peer: any, data: PawnClickedData) {
  peer.publish(
    "data.data.roomId",
    JSON.stringify({
      type: "PAWN_CLICKED",
      data: data.data,
    }),
  );
}

function handlePawnMoved(peer: any, data: PawnMovedData) {
  peer.publish(
    data.data.roomId,
    JSON.stringify({
      type: "PAWN_MOVED",
      data: data.data,
    }),
  );
}

function handlePawnRemoved(peer: any, data: PawnRemovedData) {
  peer.publish(
    data.data.roomId,
    JSON.stringify({
      type: "PAWN_REMOVED",
      data: data.data,
    }),
  );
}
