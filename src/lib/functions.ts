import { checkStraightLine } from './helper';
import { boardCoordinate } from './store/board';
import type { Coordinate, Pawn, PawnCoordinate } from './types/global.type';

export function getActivePawnCoordinate(activePawn: Pawn): PawnCoordinate {
	return boardCoordinate.find((coordinate) => coordinate.x === activePawn.x && coordinate.y === activePawn.y);
}

export function getEnemiesInContact(
	pawnCoordinates: Pawn[],
	activePawnCoordinate: PawnCoordinate,
	activePawn: Pawn
): Pawn[] {
	return pawnCoordinates.filter((pawnCoordinate) =>
		activePawnCoordinate.possiblePaths.some(
			(coordinate) =>
				coordinate.x === pawnCoordinate.x &&
				coordinate.y === pawnCoordinate.y &&
				activePawn.color !== pawnCoordinate.color
		)
	);
}

export function getEnemyPossiblePaths(enemiesInContact: Pawn[], activePawn: Pawn) {
	return boardCoordinate
		.filter((coordinate) =>
			enemiesInContact.some((enemy) => enemy.x === coordinate.x && enemy.y === coordinate.y)
		)
		.flatMap((enemy) =>
			enemy.possiblePaths.filter((coordinate) => {
				return checkStraightLine([
					[activePawn.x, activePawn.y],
					[enemy.x, enemy.y],
					[coordinate.x, coordinate.y],
				]);
			})
		);
}

export function getEatSuggestionCoordinates(
	activePawnCoordinate: PawnCoordinate,
	enemyPossiblePaths: Coordinate[],
	pawnCoordinates: Pawn[]
): Coordinate[] {
	return activePawnCoordinate.eatingPaths
		.filter((coordinate) =>
			enemyPossiblePaths.some(
				(possiblePath) => possiblePath.x === coordinate.x && possiblePath.y === coordinate.y
			)
		)
		.filter(
			(coordinate) =>
				!pawnCoordinates.some(
					(pawnCoordinate) => pawnCoordinate.x === coordinate.x && pawnCoordinate.y === coordinate.y
				)
		);
}
