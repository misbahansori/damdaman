import { describe, it, expect } from "vitest";
import { checkTwoEnemiesInARow } from "./helper";

describe("checkTwoEnemiesInRow", () => {
  it("should detect two enemies in horizontal line", () => {
    const currentCoordinate: Coordinate = { x: 100, y: 1200 };
    const enemiesCoordinate: Coordinate[] = [
      { x: 300, y: 1200 },
      { x: 500, y: 1200 },
    ];
    const targetCoordinate: Coordinate = { x: 700, y: 1200 };

    expect(
      checkTwoEnemiesInARow(
        currentCoordinate,
        enemiesCoordinate,
        targetCoordinate,
      ),
    ).toBe(true);
  });

  it("should detect two enemies in vertical line", () => {
    const currentCoordinate: Coordinate = { x: 100, y: 100 };
    const enemiesCoordinate: Coordinate[] = [
      { x: 100, y: 300 },
      { x: 100, y: 500 },
    ];
    const targetCoordinate: Coordinate = { x: 100, y: 700 };

    expect(
      checkTwoEnemiesInARow(
        currentCoordinate,
        enemiesCoordinate,
        targetCoordinate,
      ),
    ).toBe(true);
  });

  it("should detect two enemies in diagonal line", () => {
    const currentCoordinate: Coordinate = { x: 900, y: 800 };
    const enemiesCoordinate: Coordinate[] = [
      { x: 500, y: 1200 },
      { x: 325, y: 1375 },
    ];
    const targetCoordinate: Coordinate = { x: 200, y: 1500 };

    expect(
      checkTwoEnemiesInARow(
        currentCoordinate,
        enemiesCoordinate,
        targetCoordinate,
      ),
    ).toBe(true);
  });

  it("should return false for one enemy in path", () => {
    const currentCoordinate: Coordinate = { x: 100, y: 1200 };
    const enemiesCoordinate: Coordinate[] = [{ x: 300, y: 1200 }];
    const targetCoordinate: Coordinate = { x: 500, y: 1200 };

    expect(
      checkTwoEnemiesInARow(
        currentCoordinate,
        enemiesCoordinate,
        targetCoordinate,
      ),
    ).toBe(false);
  });

  it("should return false for enemies not in path", () => {
    const currentCoordinate: Coordinate = { x: 100, y: 1200 };
    const enemiesCoordinate: Coordinate[] = [
      { x: 300, y: 1300 },
      { x: 500, y: 1100 },
    ];
    const targetCoordinate: Coordinate = { x: 700, y: 1200 };

    expect(
      checkTwoEnemiesInARow(
        currentCoordinate,
        enemiesCoordinate,
        targetCoordinate,
      ),
    ).toBe(false);
  });

  it("should return false for invalid movement pattern", () => {
    const currentCoordinate: Coordinate = { x: 100, y: 1200 };
    const enemiesCoordinate: Coordinate[] = [
      { x: 300, y: 1300 },
      { x: 500, y: 1400 },
    ];
    const targetCoordinate: Coordinate = { x: 700, y: 1500 };

    expect(
      checkTwoEnemiesInARow(
        currentCoordinate,
        enemiesCoordinate,
        targetCoordinate,
      ),
    ).toBe(false);
  });
});
