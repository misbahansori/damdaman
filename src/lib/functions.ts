import { boardCoordinate } from './store/board';
import type { Pawn, PawnCoordinate } from './types/global.type';

export function getActivePawnCoordinate(activePawn: Pawn): PawnCoordinate {
	return boardCoordinate.find(
		(coordinate) => coordinate.x === activePawn.x && coordinate.y === activePawn.y
	);
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
