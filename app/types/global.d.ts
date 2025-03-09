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
