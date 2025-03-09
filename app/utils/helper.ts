import type { Coordinate } from "~/types/global";

export const checkStraightLine = (
  coordinates: [[number, number], [number, number], [number, number]],
) => {
  const [coordinate1, coordinate2, coordinate3] = coordinates;
  const [x1, y1] = coordinate1;
  const [x2, y2] = coordinate2;
  const [x3, y3] = coordinate3;

  if (x2 - x1 > 0 && x3 - x2 < 0) return false;
  if (x2 - x1 < 0 && x3 - x2 > 0) return false;
  if (y2 - y1 > 0 && y3 - y2 < 0) return false;
  if (y2 - y1 < 0 && y3 - y2 > 0) return false;

  const slope1 = (y2 - y1) / (x2 - x1);
  const slope2 = (y3 - y2) / (x3 - x2);

  return slope1 === slope2;
};

export const checkTwoEnemiesInARow = (
  currentCoordinate: Coordinate,
  enemiesCoordinate: Coordinate[],
  targetCoordinate: Coordinate,
) => {
  const enemies = enemiesCoordinate.filter(
    (enemyCoordinate) =>
      enemyCoordinate.x !== currentCoordinate.x &&
      enemyCoordinate.y !== currentCoordinate.y,
  );
  return (
    enemies.filter((enemy) =>
      checkStraightLine([
        [currentCoordinate.x, currentCoordinate.y],
        [enemy.x, enemy.y],
        [targetCoordinate.x, targetCoordinate.y],
      ]),
    ).length >= 2
  );
};
