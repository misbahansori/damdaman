import { type Pawn } from "~/types/global";

export function getPawnCoordinate(pawn: Pawn | null): Pawn {
  if (!pawn) {
    return { id: 0, x: 0, y: 0, color: "red" };
  }

  return pawn;
}

export function getEatSuggestionCoordinates(
  pawnCoordinates: Pawn[],
  activePawnCoordinate: Pawn,
  activePawn: Pawn | null,
  isAlone: boolean,
): Pawn[] {
  if (!activePawn) return [];

  const enemiesInContact = getEnemiesInContact(
    pawnCoordinates,
    activePawnCoordinate,
    activePawn,
    isAlone,
  );

  return enemiesInContact.reduce<Pawn[]>((acc, enemy) => {
    const x = enemy.x - activePawn.x;
    const y = enemy.y - activePawn.y;

    const possibleMove = {
      id: 0,
      x: enemy.x + x,
      y: enemy.y + y,
      color: activePawn.color,
    };

    const isOccupied = pawnCoordinates.some(
      (pawn) => pawn.x === possibleMove.x && pawn.y === possibleMove.y,
    );

    if (isOccupied) {
      return acc;
    }

    if (
      possibleMove.x < 0 ||
      possibleMove.x > 7 ||
      possibleMove.y < 0 ||
      possibleMove.y > 7
    ) {
      return acc;
    }

    return [...acc, possibleMove];
  }, []);
}

export function getEnemiesInContact(
  pawnCoordinates: Pawn[],
  activePawnCoordinate: Pawn,
  activePawn: Pawn | null,
  isAlone: boolean,
): Pawn[] {
  if (!activePawn) return [];

  const enemies = pawnCoordinates.filter(
    (pawn) => pawn.color !== activePawn.color,
  );

  return enemies.filter((enemy) => {
    const xDiff = Math.abs(enemy.x - activePawnCoordinate.x);
    const yDiff = Math.abs(enemy.y - activePawnCoordinate.y);

    if (isAlone) {
      return xDiff === 1 && yDiff === 1;
    }

    return xDiff <= 2 && yDiff <= 2;
  });
}

export function getSuggestionPath(
  activePawn: Pawn | null,
  pawnCoordinates: Pawn[],
  isAlone: boolean,
): Pawn[] {
  if (!activePawn) return [];

  const possibleMoves: Pawn[] = [];

  // Get all possible moves
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x === 0 || y === 0) continue;

      const possibleMove = {
        id: 0,
        x: activePawn.x + x,
        y: activePawn.y + y,
        color: activePawn.color,
      };

      if (
        possibleMove.x < 0 ||
        possibleMove.x > 7 ||
        possibleMove.y < 0 ||
        possibleMove.y > 7
      ) {
        continue;
      }

      const isOccupied = pawnCoordinates.some(
        (pawn) => pawn.x === possibleMove.x && pawn.y === possibleMove.y,
      );

      if (isOccupied) {
        continue;
      }

      possibleMoves.push(possibleMove);
    }
  }

  const activePawnCoordinate = getPawnCoordinate(activePawn);
  const eatSuggestionCoordinates = getEatSuggestionCoordinates(
    pawnCoordinates,
    activePawnCoordinate,
    activePawn,
    isAlone,
  );

  if (eatSuggestionCoordinates.length) {
    return eatSuggestionCoordinates;
  }

  return possibleMoves;
}

export function getDamCoordinates(
  currentPawnCoordinates: Pawn[],
  pawnCoordinates: Pawn[],
): Pawn[] {
  const damCoordinates: Pawn[] = [];

  for (const pawn of currentPawnCoordinates) {
    const possibleMoves: Pawn[] = [];

    // Get all possible moves
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 || y === 0) continue;

        const possibleMove = {
          id: 0,
          x: pawn.x + x,
          y: pawn.y + y,
          color: pawn.color,
        };

        if (
          possibleMove.x < 0 ||
          possibleMove.x > 7 ||
          possibleMove.y < 0 ||
          possibleMove.y > 7
        ) {
          continue;
        }

        const isOccupied = pawnCoordinates.some(
          (p) => p.x === possibleMove.x && p.y === possibleMove.y,
        );

        if (isOccupied) {
          continue;
        }

        possibleMoves.push(possibleMove);
      }
    }

    if (possibleMoves.length === 0) {
      damCoordinates.push(pawn);
    }
  }

  return damCoordinates;
}
