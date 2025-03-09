import { describe, it, expect, beforeEach } from "vitest";
import {
  getPawnCoordinate,
  getEmptyCoordinate,
  getEnemiesInContact,
  getEnemyPossiblePaths,
  getEatSuggestionCoordinates,
  getSuggestionPawns,
  getDamCoordinates,
} from "./functions";
import type { Pawn, PawnCoordinate } from "~/types/global";

describe("getPawnCoordinate", () => {
  it("should return correct board coordinate for a pawn", () => {
    const redPawn: Pawn = { id: 1, x: 200, y: 100, color: "red" };

    const result = getPawnCoordinate(redPawn);
    expect(result).toBeDefined();
    expect(result.x).toBe(redPawn.x);
    expect(result.y).toBe(redPawn.y);
  });

  it("should throw error for invalid pawn coordinates", () => {
    const invalidPawn: Pawn = { id: 1, x: 100, y: 100, color: "red" };

    expect(() => getPawnCoordinate(invalidPawn)).toThrow(
      "Pawn coordinates not found",
    );
  });
});

describe("getEmptyCoordinate", () => {
  it("should return all empty board coordinates", () => {
    const redPawn: Pawn = { id: 1, x: 200, y: 100, color: "red" };
    const bluePawn: Pawn = { id: 2, x: 300, y: 400, color: "blue" };

    const emptyCoordinates = getEmptyCoordinate([redPawn, bluePawn]);
    expect(emptyCoordinates.length).toBeGreaterThan(0);

    expect(emptyCoordinates).not.toContainEqual(
      expect.objectContaining({ x: redPawn.x, y: redPawn.y }),
    );

    expect(emptyCoordinates).not.toContainEqual(
      expect.objectContaining({ x: bluePawn.x, y: bluePawn.y }),
    );
  });
});

describe("getEnemiesInContact", () => {
  it("should return enemies in contact when there are adjacent enemies", () => {
    const redPawn: Pawn = { id: 1, x: 300, y: 600, color: "red" };
    const bluePawn: Pawn = { id: 2, x: 500, y: 400, color: "blue" };

    const enemies = getEnemiesInContact([redPawn, bluePawn], redPawn, true);

    expect(enemies).toContainEqual(bluePawn);
  });

  it("should return additional enemies when alone", () => {
    const redPawn: Pawn = { id: 1, x: 300, y: 600, color: "red" };
    const bluePawn1: Pawn = { id: 2, x: 500, y: 400, color: "blue" };
    const bluePawn2: Pawn = { id: 3, x: 300, y: 800, color: "blue" };

    const enemies = getEnemiesInContact(
      [redPawn, bluePawn1, bluePawn2],
      redPawn,
      true,
    );
    expect(enemies).toContainEqual(bluePawn1);
    expect(enemies).toContainEqual(bluePawn2);
  });

  it("should not return friendly pawns", () => {
    const redPawn: Pawn = { id: 1, x: 300, y: 600, color: "red" };
    const friendlyPawn: Pawn = { id: 2, x: 500, y: 600, color: "red" };

    const enemies = getEnemiesInContact(
      [redPawn, friendlyPawn],
      redPawn,
      false,
    );
    expect(enemies).not.toContainEqual(friendlyPawn);
  });
});

describe("getEnemyPossiblePaths", () => {
  it("should return possible paths for enemy pawns in straight line", () => {
    const redPawn: Pawn = { id: 1, x: 300, y: 600, color: "red" };
    const bluePawn: Pawn = { id: 2, x: 500, y: 400, color: "blue" };

    const enemies = [bluePawn];
    const paths = getEnemyPossiblePaths(enemies, redPawn);
    expect(paths.length).toBeGreaterThan(0);

    paths.forEach((path) => {
      expect(
        checkStraightLine([
          [redPawn.x, redPawn.y],
          [bluePawn.x, bluePawn.y],
          [path.x, path.y],
        ]),
      ).toBe(true);
    });
  });
});

describe("getEatSuggestionCoordinates", () => {
  it("should return possible eating moves when not alone", () => {
    const redPawn: Pawn = { id: 1, x: 300, y: 600, color: "red" };
    const bluePawn: Pawn = { id: 2, x: 500, y: 400, color: "blue" };

    const enemies = [bluePawn];
    const suggestions = getEatSuggestionCoordinates(
      [redPawn, bluePawn],
      redPawn,
      false,
    );
    expect(suggestions).toBeDefined();

    expect(suggestions).toContainEqual(
      expect.objectContaining({ x: 675, y: 225 }),
    );
  });

  it("should include additional eating paths when alone", () => {
    const redPawn: Pawn = { id: 1, x: 300, y: 600, color: "red" };
    const bluePawn: Pawn = { id: 2, x: 500, y: 400, color: "blue" };

    const enemies = [bluePawn];
    const suggestions = getEatSuggestionCoordinates(
      [redPawn, bluePawn],
      redPawn,
      true,
    );
    expect(suggestions).toBeDefined();
    // Should include both regular and additional eating paths
  });
});

describe("getSuggestionPawns", () => {
  it("should return possible moves for a pawn", () => {
    const redPawn: Pawn = { id: 1, x: 300, y: 600, color: "red" };
    const bluePawn: Pawn = { id: 2, x: 500, y: 400, color: "blue" };

    const enemies = [bluePawn];
    const suggestions = getSuggestionPawns(redPawn, enemies, false);
    expect(suggestions).toBeDefined();
    suggestions.forEach((move) => {
      expect(enemies.some((p) => p.x === move.x && p.y === move.y)).toBe(false);
    });
  });

  it("should include eating moves when enemies are present", () => {
    const redPawn: Pawn = { id: 1, x: 300, y: 600, color: "red" };
    const bluePawn: Pawn = { id: 2, x: 500, y: 400, color: "blue" };

    const suggestions = getSuggestionPawns(redPawn, [redPawn, bluePawn], false);

    expect(suggestions).toContainEqual(
      expect.objectContaining({ x: 675, y: 225 }),
    );
  });

  it("should return not return enemy when there are more than 2 enemies in a row", () => {
    const redPawn: Pawn = { id: 1, x: 100, y: 400, color: "red" };
    const bluePawn1: Pawn = { id: 2, x: 100, y: 800, color: "blue" };
    const bluePawn2: Pawn = { id: 3, x: 100, y: 1000, color: "blue" };

    const enemies = getSuggestionPawns(redPawn, [bluePawn1, bluePawn2], true);

    expect(enemies).not.toContainEqual(
      expect.objectContaining({ x: 100, y: 1200 }),
    );
  });

  it("should return not return enemy when there are more than 2 enemies in a row", () => {
    const redPawn: Pawn = { id: 1, x: 100, y: 1200, color: "red" };
    const bluePawn1: Pawn = { id: 2, x: 100, y: 1000, color: "blue" };
    const bluePawn2: Pawn = { id: 3, x: 100, y: 800, color: "blue" };

    const enemies = getSuggestionPawns(redPawn, [bluePawn1, bluePawn2], true);

    expect(enemies).not.toContainEqual(
      expect.objectContaining({ x: 100, y: 600 }),
    );
    expect(enemies).not.toContainEqual(
      expect.objectContaining({ x: 100, y: 400 }),
    );
  });
});
