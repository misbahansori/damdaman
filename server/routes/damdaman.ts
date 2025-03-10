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
    const data = JSON.parse(message.text());

    const handlers: Record<string, () => void> = {
      PING: () => {
        const payload = {
          type: "SYSTEM",
          message: "PONG",
        };
        peer.send(JSON.stringify(payload));
      },
      CREATE_ROOM: () => {
        const payload = {
          type: "CREATE_ROOM",
          data: data.data,
        };
        peer.publish("global", JSON.stringify(payload));
      },
      PAWN_CLICKED: () => {
        const payload = {
          type: "PAWN_CLICKED",
          data: data.data,
        };
        peer.publish("global", JSON.stringify(payload));
      },
      PAWN_MOVED: () => {
        const payload = {
          type: "PAWN_MOVED",
          data: data.data,
        };
        peer.publish("global", JSON.stringify(payload));
      },
      PAWN_REMOVED: () => {
        const payload = {
          type: "PAWN_REMOVED",
          data: data.data,
        };
        peer.publish("global", JSON.stringify(payload));
      },
    };

    handlers[data.type]?.();
  },
  close(peer) {
    peer.publish(
      "global",
      JSON.stringify({ type: "SYSTEM", message: `${peer} left!` }),
    );
  },
});
