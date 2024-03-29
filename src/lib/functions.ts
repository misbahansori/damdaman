import { checkStraightLine, checkTwoEnemiesInARow } from './helper';
import { boardCoordinate } from './store/board';
import { activePawn, numberOfTurns, suggestionPaths, turn } from './store/state';
import {
	Color,
	type Coordinate,
	type DamCoordinate,
	type Pawn,
	type PawnCoordinate,
} from './types/global.type';

export function changeTurn(): void {
	activePawn.set(null);

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

export function getPawnCoordinate(activePawn: Pawn): PawnCoordinate {
	const pawnCoordinates = boardCoordinate.find(
		(coordinate) => coordinate.x === activePawn.x && coordinate.y === activePawn.y
	);

	if (!pawnCoordinates) {
		throw new Error('Pawn coordinates not found.');
	}

	return pawnCoordinates;
}

export function getEmptyCoordinate(pawnCoordinates: Pawn[]): PawnCoordinate[] {
	return boardCoordinate.filter((coordinate) => {
		return !pawnCoordinates.some((pawn) => pawn.x === coordinate.x && pawn.y === coordinate.y);
	});
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

	let additionalEatingPaths: Coordinate[] = [];

	if (isAlone) {
		additionalEatingPaths = activePawnCoordinate.eatingPaths
			.concat(activePawnCoordinate.additionalPaths)
			.filter((coordinate) =>
				enemiesInContact.some((enemy) =>
					checkStraightLine([
						[activePawn.x, activePawn.y],
						[enemy.x, enemy.y],
						[coordinate.x, coordinate.y],
					])
				)
			)
			.filter(
				(coordinate) =>
					!pawnCoordinates.some(
						(pawnCoordinate) => pawnCoordinate.x === coordinate.x && pawnCoordinate.y === coordinate.y
					)
			);
	}

	// Make sure the coordinates are unique.
	const possiblePaths = eatingPaths
		.concat(additionalEatingPaths)
		.filter(
			(coordinate, index, self) =>
				self.findIndex((item) => item.x === coordinate.x && item.y === coordinate.y) === index
		);

	return possiblePaths;
}

export function getSuggestionPath(activePawn: Pawn, pawnCoordinates: Pawn[], isAlone: boolean): Coordinate[] {
	const activePawnCoordinate = getPawnCoordinate(activePawn);

	if (!activePawnCoordinate) {
		return [];
	}

	let possiblePaths = activePawnCoordinate.possiblePaths;

	const enemiesInContact = getEnemiesInContact(pawnCoordinates, activePawnCoordinate, activePawn, isAlone);

	if (enemiesInContact.length > 0) {
		const enemyPossiblePaths = getEnemyPossiblePaths(enemiesInContact, activePawn);

		possiblePaths = possiblePaths.concat(enemyPossiblePaths);
	}

	if (isAlone) {
		possiblePaths = possiblePaths
			.concat(activePawnCoordinate.eatingPaths)
			.concat(activePawnCoordinate.additionalPaths);

		const enemiesCoordinates = pawnCoordinates.filter(
			(pawnCoordinate) => pawnCoordinate.color !== activePawn.color
		);

		possiblePaths = possiblePaths.filter(
			(coordinate) => !checkTwoEnemiesInARow(activePawnCoordinate, enemiesCoordinates, coordinate)
		);
	}

	possiblePaths = possiblePaths.filter(
		(coordinate) =>
			!pawnCoordinates.some(
				(pawnCoordinate) => pawnCoordinate.x === coordinate.x && pawnCoordinate.y === coordinate.y
			)
	);

	// Make sure the coordinates are unique.
	possiblePaths = possiblePaths.filter(
		(coordinate, index, self) =>
			self.findIndex((item) => item.x === coordinate.x && item.y === coordinate.y) === index
	);

	return possiblePaths;
}

export function getDamCoordinates(currentPawnCoordinates: Pawn[], pawnCoordinates: Pawn[]) {
	const emptyCoordinates = getEmptyCoordinate(pawnCoordinates);

	let damCoordinates: DamCoordinate[] = [];

	currentPawnCoordinates.forEach((pawnCoordinate) => {
		const activePawnCoordinate = getPawnCoordinate(pawnCoordinate);
		const enemiesInContact = getEnemiesInContact(
			pawnCoordinates,
			activePawnCoordinate,
			pawnCoordinate,
			false
		);

		let enemyPossiblePaths = getEnemyPossiblePaths(enemiesInContact, pawnCoordinate);

		enemyPossiblePaths = enemyPossiblePaths.filter((coordinate) =>
			emptyCoordinates.some(
				(emptyCoordinate) => emptyCoordinate.x === coordinate.x && emptyCoordinate.y === coordinate.y
			)
		);

		enemiesInContact.forEach((enemy) => {
			enemyPossiblePaths.forEach((coordinate) => {
				damCoordinates.push({
					activePawn: pawnCoordinate,
					enemyPawn: enemy,
					target: coordinate,
				});
			});
		});
	});

	return damCoordinates.filter((coordinates) =>
		checkStraightLine([
			[coordinates.activePawn.x, coordinates.activePawn.y],
			[coordinates.enemyPawn.x, coordinates.enemyPawn.y],
			[coordinates.target.x, coordinates.target.y],
		])
	);
}
