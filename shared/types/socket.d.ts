export interface PingData {
  type: "PING";
  data: null;
}

export interface JoinRoomData {
  type: "JOIN_ROOM";
  data: {
    roomId: string;
  };
}

export interface LeaveRoomData {
  type: "LEAVE_ROOM";
  data: {
    roomId: string;
  };
}

export interface PawnClickedData {
  type: "PAWN_CLICKED";
  data: {
    roomId: string;
    id: string;
  };
}

export interface PawnMovedData {
  type: "PAWN_MOVED";
  data: {
    roomId: string;
    coordinate: {
      x: number;
      y: number;
    };
  };
}

export interface PawnRemovedData {
  type: "PAWN_REMOVED";
  data: {
    roomId: string;
    id: string;
  };
}

export type SocketData =
  | PingData
  | JoinRoomData
  | LeaveRoomData
  | PawnClickedData
  | PawnMovedData
  | PawnRemovedData;
