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
): boolean => {
  const dx = targetCoordinate.x - currentCoordinate.x;
  const dy = targetCoordinate.y - currentCoordinate.y;

  // Check if movement is either diagonal (|dx| === |dy|) or straight (dx === 0 or dy === 0)
  const isDiagonal = Math.abs(dx) === Math.abs(dy);
  const isStraight = dx === 0 || dy === 0;

  if (!isDiagonal && !isStraight) {
    return false;
  }

  // Get direction of movement
  const stepX = dx === 0 ? 0 : Math.sign(dx);
  const stepY = dy === 0 ? 0 : Math.sign(dy);

  // Count enemies that lie on the path between current and target
  let enemiesInPath = 0;
  let x = currentCoordinate.x + stepX;
  let y = currentCoordinate.y + stepY;

  // Check each coordinate between current and target
  while (x !== targetCoordinate.x || y !== targetCoordinate.y) {
    if (enemiesCoordinate.some((enemy) => enemy.x === x && enemy.y === y)) {
      enemiesInPath++;

      // If we find more than one enemy in the path
      if (enemiesInPath >= 2) {
        return true;
      }
    }

    x += stepX;
    y += stepY;
  }

  return false;
};

// Test cases
const testCheckTwoEnemiesInARow = () => {
  // Test case 1: Two enemies in diagonal path
  const current1: Coordinate = { x: 0, y: 0 };
  const target1: Coordinate = { x: 3, y: 3 };
  const enemies1: Coordinate[] = [
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ];
  console.assert(
    checkTwoEnemiesInARow(current1, enemies1, target1) === true,
    "Should detect two enemies in diagonal path",
  );

  // Test case 2: One enemy in diagonal path
  const current2: Coordinate = { x: 0, y: 0 };
  const target2: Coordinate = { x: 2, y: 2 };
  const enemies2: Coordinate[] = [{ x: 1, y: 1 }];
  console.assert(
    checkTwoEnemiesInARow(current2, enemies2, target2) === false,
    "Should allow one enemy in diagonal path",
  );

  // Test case 3: Enemies not in path
  const current3: Coordinate = { x: 0, y: 0 };
  const target3: Coordinate = { x: 2, y: 2 };
  const enemies3: Coordinate[] = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ];
  console.assert(
    checkTwoEnemiesInARow(current3, enemies3, target3) === false,
    "Should ignore enemies not in path",
  );

  // Test case 4: Non-diagonal movement
  const current4: Coordinate = { x: 0, y: 0 };
  const target4: Coordinate = { x: 2, y: 1 };
  const enemies4: Coordinate[] = [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ];
  console.assert(
    checkTwoEnemiesInARow(current4, enemies4, target4) === false,
    "Should reject non-diagonal movement",
  );
};
