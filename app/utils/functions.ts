import {
  type Coordinate,
  type DamCoordinate,
  type Pawn,
  type PawnCoordinate,
} from "~/types/global";

/**
 * Get the coordinate of a pawn on the board.
 * Optimization: Early return when found
 */
export function getPawnCoordinate(activePawn: Pawn): PawnCoordinate {
  for (const coordinate of boardCoordinate) {
    if (coordinate.x === activePawn.x && coordinate.y === activePawn.y) {
      return coordinate;
    }
  }
  throw new Error("Pawn coordinates not found.");
}

/**
 * Get the empty coordinates on the board.
 * Optimization: Use Set for O(1) lookups
 */
export function getEmptyCoordinate(pawnCoordinates: Pawn[]): PawnCoordinate[] {
  const occupiedSpaces = new Set(
    pawnCoordinates.map((pawn) => `${pawn.x},${pawn.y}`),
  );

  return boardCoordinate.filter(
    (coordinate) => !occupiedSpaces.has(`${coordinate.x},${coordinate.y}`),
  );
}

/**
 * Get the enemies in contact with the active pawn.
 * Optimization: Single pass filter with combined conditions
 */
export function getEnemiesInContact(
  pawnCoordinates: Pawn[],
  activePawn: Pawn,
  isAlone: boolean,
): Pawn[] {
  const activePawnCoordinate = getPawnCoordinate(activePawn);
  const enemySet = new Set<Pawn>();

  // Convert paths to Sets for O(1) lookups
  const possiblePathsSet = new Set(
    activePawnCoordinate.possiblePaths.map((p) => `${p.x},${p.y}`),
  );

  const eatingPathsSet = isAlone
    ? new Set(activePawnCoordinate.eatingPaths.map((p) => `${p.x},${p.y}`))
    : new Set();

  const additionalPathsSet = isAlone
    ? new Set(activePawnCoordinate.additionalPaths.map((p) => `${p.x},${p.y}`))
    : new Set();

  // Single pass through pawnCoordinates
  for (const pawn of pawnCoordinates) {
    if (pawn.color === activePawn.color) continue;

    const key = `${pawn.x},${pawn.y}`;
    if (
      possiblePathsSet.has(key) ||
      (isAlone && (eatingPathsSet.has(key) || additionalPathsSet.has(key)))
    ) {
      enemySet.add(pawn);
    }
  }

  return Array.from(enemySet);
}

/**
 * Get the possible paths for the enemies in contact with the active pawn.
 * Optimization: Reduce nested iterations using Sets
 */
export function getEnemyPossiblePaths(
  enemiesInContact: Pawn[],
  activePawn: Pawn,
): Coordinate[] {
  const enemySet = new Set(
    enemiesInContact.map((enemy) => `${enemy.x},${enemy.y}`),
  );

  const paths: Coordinate[] = [];

  for (const coordinate of boardCoordinate) {
    if (!enemySet.has(`${coordinate.x},${coordinate.y}`)) continue;

    for (const possiblePath of coordinate.possiblePaths) {
      if (
        checkStraightLine([
          [activePawn.x, activePawn.y],
          [coordinate.x, coordinate.y],
          [possiblePath.x, possiblePath.y],
        ])
      ) {
        paths.push(possiblePath);
      }
    }
  }

  return paths;
}

/**
 * Get the eating suggestion coordinates for the active pawn.
 * Optimization: Combine filters and use Sets for uniqueness
 */
export function getEatSuggestionCoordinates(
  pawnCoordinates: Pawn[],
  activePawn: Pawn,
  isAlone: boolean,
): Coordinate[] {
  const enemiesInContact = getEnemiesInContact(
    pawnCoordinates,
    activePawn,
    isAlone,
  );
  const enemyPossiblePaths = getEnemyPossiblePaths(
    enemiesInContact,
    activePawn,
  );
  const activePawnCoordinate = getPawnCoordinate(activePawn);

  // Convert to Sets for O(1) lookups
  const enemyPathsSet = new Set(
    enemyPossiblePaths.map((path) => `${path.x},${path.y}`),
  );
  const occupiedSpacesSet = new Set(
    pawnCoordinates.map((pawn) => `${pawn.x},${pawn.y}`),
  );
  const enemiesCoordinates = pawnCoordinates.filter(
    (pawn) => pawn.color !== activePawn.color,
  );

  const validPaths = new Set<string>();

  // Process eating paths
  for (const path of activePawnCoordinate.eatingPaths) {
    const key = `${path.x},${path.y}`;
    if (
      enemyPathsSet.has(key) &&
      !occupiedSpacesSet.has(key) &&
      (!isAlone ||
        !checkTwoEnemiesInARow(activePawnCoordinate, enemiesCoordinates, path))
    ) {
      validPaths.add(key);
    }
  }

  // Process additional paths if alone
  if (isAlone) {
    const allPaths = [
      ...activePawnCoordinate.eatingPaths,
      ...activePawnCoordinate.additionalPaths,
    ];

    for (const path of allPaths) {
      const key = `${path.x},${path.y}`;
      if (
        !occupiedSpacesSet.has(key) &&
        !checkTwoEnemiesInARow(
          activePawnCoordinate,
          enemiesCoordinates,
          path,
        ) &&
        enemiesInContact.some((enemy) =>
          checkStraightLine([
            [activePawn.x, activePawn.y],
            [enemy.x, enemy.y],
            [path.x, path.y],
          ]),
        )
      ) {
        validPaths.add(key);
      }
    }
  }
  // Convert back to coordinates
  return Array.from(validPaths).map((key) => {
    const [x, y] = key.split(",").map(Number);
    return { x: x!, y: y! } as Coordinate;
  });
}

/**
 * Get the suggestion pawns for the active pawn.
 * Optimization: Use Sets and reduce iterations
 */
export function getSuggestionPawns(
  activePawn: Pawn,
  pawnCoordinates: Pawn[],
  isAlone: boolean,
): Coordinate[] {
  const activePawnCoordinate = getPawnCoordinate(activePawn);
  if (!activePawnCoordinate) return [];

  const occupiedSpacesSet = new Set(
    pawnCoordinates.map((pawn) => `${pawn.x},${pawn.y}`),
  );

  const validPaths = new Set<string>();
  const enemiesCoordinates = pawnCoordinates.filter(
    (pawn) => pawn.color !== activePawn.color,
  );

  // Add basic possible paths
  activePawnCoordinate.possiblePaths.forEach((path) => {
    const key = `${path.x},${path.y}`;
    if (!occupiedSpacesSet.has(key)) {
      validPaths.add(key);
    }
  });

  // Add enemy-related paths
  const enemiesInContact = getEnemiesInContact(
    pawnCoordinates,
    activePawn,
    isAlone,
  );
  if (enemiesInContact.length > 0) {
    getEnemyPossiblePaths(enemiesInContact, activePawn).forEach((path) => {
      const key = `${path.x},${path.y}`;
      if (
        !occupiedSpacesSet.has(key) &&
        (!isAlone ||
          !checkTwoEnemiesInARow(
            activePawnCoordinate,
            enemiesCoordinates,
            path,
          ))
      ) {
        validPaths.add(key);
      }
    });
  }

  // Add additional paths for alone mode
  if (isAlone) {
    [
      ...activePawnCoordinate.eatingPaths,
      ...activePawnCoordinate.additionalPaths,
    ].forEach((path) => {
      const key = `${path.x},${path.y}`;
      if (
        !occupiedSpacesSet.has(key) &&
        !checkTwoEnemiesInARow(activePawnCoordinate, enemiesCoordinates, path)
      ) {
        validPaths.add(key);
      }
    });
  }

  return Array.from(validPaths).map((key) => {
    const [x, y] = key.split(",").map(Number);
    return { x: x!, y: y! };
  });
}

/**
 * Get the dam coordinates for the active pawn.
 * Optimization: Use Sets and reduce nested iterations
 */
export function getDamCoordinates(
  currentPawnCoordinates: Pawn[],
  pawnCoordinates: Pawn[],
): DamCoordinate[] {
  const emptyCoordinatesSet = new Set(
    getEmptyCoordinate(pawnCoordinates).map((coord) => `${coord.x},${coord.y}`),
  );

  const damCoordinates: DamCoordinate[] = [];
  const processedMoves = new Set<string>();

  for (const pawn of currentPawnCoordinates) {
    const enemiesInContact = getEnemiesInContact(pawnCoordinates, pawn, false);
    const enemyPaths = getEnemyPossiblePaths(enemiesInContact, pawn);

    for (const enemy of enemiesInContact) {
      for (const target of enemyPaths) {
        if (!emptyCoordinatesSet.has(`${target.x},${target.y}`)) continue;

        const moveKey = `${pawn.x},${pawn.y}-${enemy.x},${enemy.y}-${target.x},${target.y}`;
        if (processedMoves.has(moveKey)) continue;

        if (
          checkStraightLine([
            [pawn.x, pawn.y],
            [enemy.x, enemy.y],
            [target.x, target.y],
          ])
        ) {
          processedMoves.add(moveKey);
          damCoordinates.push({ activePawn: pawn, enemyPawn: enemy, target });
        }
      }
    }
  }

  return damCoordinates;
}
