import { randomUUID } from "uncrypto";

export default defineWebSocketHandler({
  open(peer) {
    const roomId = randomUUID();

    peer.send({
      roomId,
    });
    peer.publish(roomId, { message: `${peer} joined!` });
    peer.subscribe(roomId);
  },
  message(peer, message) {
    if (message.text().includes("ping")) {
      peer.send({ user: "server", message: "pong" });
    } else {
      const msg = {
        user: peer.toString(),
        message: message.toString(),
      };
      peer.send(msg); // echo
      peer.publish("chat", msg);
    }
  },
  close(peer) {
    peer.publish("chat", { user: "server", message: `${peer} left!` });
  },
});
