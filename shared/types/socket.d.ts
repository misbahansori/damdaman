export interface Coordinate {
  x: number;
  y: number;
}

export type Color = "blue" | "red";

export interface Pawn extends Coordinate {
  id: number;
  color: Color;
}

export interface PawnCoordinate extends Coordinate {
  possiblePaths: Array<Coordinate>;
  eatingPaths: Array<Coordinate>;
  additionalPaths: Array<Coordinate>;
}

export interface DamCoordinate {
  activePawn: Coordinate;
  enemyPawn: Coordinate;
  target: Coordinate;
}

export interface Dam {
  color: Color | null;
  coordinates: DamCoordinate[];
  count: number;
  showBanner: boolean;
}

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
    pawn: Pawn;
    coordinate: Coordinate;
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
