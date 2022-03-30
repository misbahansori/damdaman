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
	activePawn: Pawn,
	isAlone: boolean
): Pawn[] {
	let enemiesInContact = pawnCoordinates.filter((pawnCoordinate) =>
		activePawnCoordinate.possiblePaths.some(
			(coordinate) =>
				coordinate.x === pawnCoordinate.x &&
				coordinate.y === pawnCoordinate.y &&
				activePawn.color !== pawnCoordinate.color
		)
	);

	if (isAlone) {
		const eatingPaths = pawnCoordinates.filter((pawnCoordinate) =>
			activePawnCoordinate.eatingPaths.some(
				(coordinate) =>
					coordinate.x === pawnCoordinate.x &&
					coordinate.y === pawnCoordinate.y &&
					activePawn.color !== pawnCoordinate.color
			)
		);
		const additionalPaths = pawnCoordinates.filter((pawnCoordinate) =>
			activePawnCoordinate.additionalPaths.some(
				(coordinate) =>
					coordinate.x === pawnCoordinate.x &&
					coordinate.y === pawnCoordinate.y &&
					activePawn.color !== pawnCoordinate.color
			)
		);

		enemiesInContact = [...enemiesInContact, ...eatingPaths, ...additionalPaths];
	}

	return enemiesInContact;
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
	activePawn: Pawn,
	isAlone: boolean
): Coordinate[] {
	const enemiesInContact = getEnemiesInContact(pawnCoordinates, activePawnCoordinate, activePawn, isAlone);
	const enemyPossiblePaths = getEnemyPossiblePaths(enemiesInContact, activePawn);

	const eatingPaths = activePawnCoordinate.eatingPaths
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

	let additionalEatingPaths = [];

	if (isAlone) {
		additionalEatingPaths = activePawnCoordinate.additionalPaths
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

	return eatingPaths.concat(additionalEatingPaths);
}

export function getSuggestionPath(activePawn: Pawn, pawnCoordinates: Pawn[], isAlone: boolean): Coordinate[] {
	const activePawnCoordinate = getActivePawnCoordinate(activePawn);

	if (!activePawnCoordinate) {
		return [];
	}

	let eatSuggestionCoordinates = getEatSuggestionCoordinates(
		pawnCoordinates,
		activePawnCoordinate,
		activePawn,
		isAlone
	);

	if (isAlone) {
		eatSuggestionCoordinates = eatSuggestionCoordinates.concat(activePawnCoordinate.eatingPaths);
		eatSuggestionCoordinates = eatSuggestionCoordinates.concat(activePawnCoordinate.additionalPaths);
	}

	const possiblePaths = activePawnCoordinate.possiblePaths.filter(
		(coordinate) =>
			!pawnCoordinates.some(
				(pawnCoordinate) => pawnCoordinate.x === coordinate.x && pawnCoordinate.y === coordinate.y
			)
	);

	return possiblePaths.concat(eatSuggestionCoordinates);
}
