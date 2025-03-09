export default defineWebSocketHandler({
  open(peer) {
    // Subscribe to public channel by default
    peer.subscribe("public");
    peer.send({
      type: "SYSTEM",
      message: "Connected to public channel",
      channel: "public",
    });
  },

  message(peer, message) {
    try {
      const data = JSON.parse(message.text());

      console.log("Received message:", data);
      switch (data.type) {
        case "CHAT":
          const { channel, content } = data;
          // Simply relay the message to the specified channel
          peer.publish(
            channel,
            JSON.stringify({
              type: "MESSAGE",
              user: peer.toString(),
              content,
              channel,
            }),
          );
          break;

        case "SUBSCRIBE":
          // Allow client to subscribe to any channel
          const { channelId } = data;
          peer.subscribe(channelId);
          peer.send({
            type: "SUBSCRIBED",
            message: `Subscribed to channel ${channelId}`,
            channel: channelId,
          });
          // Notify channel members
          peer.publish(
            channelId,
            JSON.stringify({
              type: "USER_JOINED",
              user: peer.toString(),
              channel: channelId,
            }),
          );
          break;

        case "UNSUBSCRIBE":
          // Allow client to unsubscribe from a channel
          const { channelId: leaveChannelId } = data;
          peer.unsubscribe(leaveChannelId);
          // Notify channel members
          peer.publish(
            leaveChannelId,
            JSON.stringify({
              type: "USER_LEFT",
              user: peer.toString(),
              channel: leaveChannelId,
            }),
          );
          break;
      }
    } catch (error) {
      peer.send({
        type: "ERROR",
        message: "Invalid message format",
        channel: "public",
      });
    }
  },

  close(peer) {
    // Just notify public channel when a user disconnects
    peer.publish("public", {
      type: "USER_LEFT",
      user: peer.toString(),
      channel: "public",
    });
  },
});
