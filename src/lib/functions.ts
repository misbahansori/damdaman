import { checkStraightLine } from './helper';
import { boardCoordinate } from './store/board';
import { activePawn, numberOfTurns, suggestionPaths, turn } from './store/state';
import { Color, type Coordinate, type Pawn, type PawnCoordinate } from './types/global.type';

export function changeTurn(): void {
	activePawn.set({
		id: null,
		x: null,
		y: null,
		color: null,
	});

	suggestionPaths.set([]);

	turn.update((t) => {
		if (t === Color.BLUE) {
			return Color.RED;
		} else {
			return Color.BLUE;
		}
	});

	numberOfTurns.set(0);
}

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
	pawnCoordinates: Pawn[],
	activePawnCoordinate: PawnCoordinate,
	activePawn: Pawn
): Coordinate[] {
	const enemiesInContact = getEnemiesInContact(pawnCoordinates, activePawnCoordinate, activePawn);
	const enemyPossiblePaths = getEnemyPossiblePaths(enemiesInContact, activePawn);
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

export function getSuggestionPath(activePawn: Pawn, pawnCoordinates: Pawn[]): Coordinate[] {
	const activePawnCoordinate = getActivePawnCoordinate(activePawn);

	if (!activePawnCoordinate) {
		return [];
	}

	const eatSuggestionCoordinates = getEatSuggestionCoordinates(
		pawnCoordinates,
		activePawnCoordinate,
		activePawn
	);

	const possiblePaths = activePawnCoordinate.possiblePaths.filter(
		(coordinate) =>
			!pawnCoordinates.some(
				(pawnCoordinate) => pawnCoordinate.x === coordinate.x && pawnCoordinate.y === coordinate.y
			)
	);

	return possiblePaths.concat(eatSuggestionCoordinates);
}
