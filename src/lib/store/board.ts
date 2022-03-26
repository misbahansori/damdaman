import type { PawnCoordinate } from '$lib/types/global.type';
import { derived } from 'svelte/store';
import { activePawn, pawnCoordinates } from '$lib/store/state';
import {
	getActivePawnCoordinate,
	getEnemiesInContact,
	getEatSuggestionCoordinates,
	getEnemyPossiblePaths,
} from '$lib/functions';

export const boardCoordinate: Array<PawnCoordinate> = [
	{
		x: 300,
		y: 100,
		possiblePaths: [
			{ x: 500, y: 100 },
			{ x: 400, y: 200 },
		],
		eatingPaths: [
			{ x: 700, y: 100 },
			{ x: 500, y: 300 },
		],
	},
	{
		x: 500,
		y: 100,
		possiblePaths: [
			{ x: 300, y: 100 },
			{ x: 700, y: 100 },
			{ x: 500, y: 200 },
		],
		eatingPaths: [{ x: 500, y: 300 }],
	},
	{
		x: 500,
		y: 200,
		possiblePaths: [
			{ x: 500, y: 100 },
			{ x: 600, y: 200 },
			{ x: 400, y: 200 },
			{ x: 500, y: 300 },
		],
		eatingPaths: [{ x: 500, y: 500 }],
	},
	{
		x: 700,
		y: 100,
		possiblePaths: [
			{ x: 500, y: 100 },
			{ x: 600, y: 200 },
		],
		eatingPaths: [{ x: 500, y: 300 }],
	},
	{
		x: 400,
		y: 200,
		possiblePaths: [
			{ x: 500, y: 200 },
			{ x: 300, y: 100 },
			{ x: 500, y: 300 },
		],
		eatingPaths: [
			{ x: 600, y: 200 },
			{ x: 700, y: 500 },
		],
	},
	{
		x: 600,
		y: 200,
		possiblePaths: [
			{ x: 700, y: 100 },
			{ x: 500, y: 200 },
			{ x: 500, y: 300 },
		],
		eatingPaths: [
			{ x: 400, y: 200 },
			{ x: 300, y: 500 },
		],
	},
	{
		x: 100,
		y: 300,
		possiblePaths: [
			{ x: 100, y: 500 },
			{ x: 300, y: 300 },
			{ x: 300, y: 500 },
		],
		eatingPaths: [
			{ x: 100, y: 700 },
			{ x: 500, y: 300 },
			{ x: 500, y: 700 },
		],
	},
	{
		x: 300,
		y: 300,
		possiblePaths: [
			{ x: 100, y: 300 },
			{ x: 300, y: 500 },
			{ x: 500, y: 300 },
		],
		eatingPaths: [
			{ x: 700, y: 300 },
			{ x: 300, y: 700 },
		],
	},
	{
		x: 500,
		y: 300,
		possiblePaths: [
			{ x: 400, y: 200 },
			{ x: 500, y: 200 },
			{ x: 600, y: 200 },
			{ x: 700, y: 300 },
			{ x: 700, y: 500 },
			{ x: 500, y: 500 },
			{ x: 300, y: 500 },
			{ x: 300, y: 300 },
		],
		eatingPaths: [
			{ x: 300, y: 100 },
			{ x: 500, y: 100 },
			{ x: 700, y: 100 },
			{ x: 100, y: 300 },
			{ x: 100, y: 700 },
			{ x: 500, y: 700 },
			{ x: 900, y: 700 },
			{ x: 900, y: 300 },
		],
	},
	{
		x: 700,
		y: 300,
		possiblePaths: [
			{ x: 500, y: 300 },
			{ x: 700, y: 500 },
			{ x: 900, y: 300 },
		],
		eatingPaths: [
			{ x: 300, y: 300 },
			{ x: 700, y: 700 },
		],
	},
	{
		x: 900,
		y: 300,
		possiblePaths: [
			{ x: 700, y: 300 },
			{ x: 900, y: 500 },
			{ x: 700, y: 500 },
		],
		eatingPaths: [
			{ x: 500, y: 300 },
			{ x: 500, y: 700 },
			{ x: 900, y: 700 },
		],
	},
	{
		x: 100,
		y: 500,
		possiblePaths: [
			{ x: 100, y: 300 },
			{ x: 300, y: 500 },
			{ x: 100, y: 700 },
		],
		eatingPaths: [
			{ x: 500, y: 500 },
			{ x: 100, y: 900 },
		],
	},
	{
		x: 300,
		y: 500,
		possiblePaths: [
			{ x: 100, y: 300 },
			{ x: 300, y: 300 },
			{ x: 500, y: 300 },
			{ x: 500, y: 500 },
			{ x: 500, y: 700 },
			{ x: 300, y: 700 },
			{ x: 100, y: 700 },
			{ x: 100, y: 500 },
		],
		eatingPaths: [
			{ x: 300, y: 900 },
			{ x: 700, y: 900 },
			{ x: 700, y: 500 },
		],
	},
	{
		x: 500,
		y: 500,
		possiblePaths: [
			{ x: 300, y: 500 },
			{ x: 500, y: 300 },
			{ x: 700, y: 500 },
			{ x: 500, y: 700 },
		],
		eatingPaths: [
			{ x: 100, y: 500 },
			{ x: 500, y: 900 },
			{ x: 500, y: 200 },
			{ x: 900, y: 500 },
		],
	},
	{
		x: 700,
		y: 500,
		possiblePaths: [
			{ x: 500, y: 500 },
			{ x: 500, y: 300 },
			{ x: 700, y: 300 },
			{ x: 900, y: 300 },
			{ x: 900, y: 500 },
			{ x: 900, y: 700 },
			{ x: 700, y: 700 },
			{ x: 500, y: 700 },
		],
		eatingPaths: [
			{ x: 300, y: 500 },
			{ x: 400, y: 200 },
			{ x: 700, y: 900 },
			{ x: 300, y: 900 },
		],
	},
	{
		x: 900,
		y: 500,
		possiblePaths: [
			{ x: 700, y: 500 },
			{ x: 900, y: 300 },
			{ x: 900, y: 700 },
		],
		eatingPaths: [
			{ x: 500, y: 500 },
			{ x: 900, y: 900 },
		],
	},
	{
		x: 100,
		y: 700,
		possiblePaths: [
			{ x: 100, y: 500 },
			{ x: 300, y: 500 },
			{ x: 300, y: 700 },
			{ x: 300, y: 900 },
			{ x: 100, y: 900 },
		],
		eatingPaths: [
			{ x: 100, y: 300 },
			{ x: 500, y: 300 },
			{ x: 500, y: 700 },
			{ x: 500, y: 1100 },
			{ x: 100, y: 1100 },
		],
	},
	{
		x: 300,
		y: 700,
		possiblePaths: [
			{ x: 100, y: 700 },
			{ x: 300, y: 500 },
			{ x: 500, y: 700 },
			{ x: 300, y: 900 },
		],
		eatingPaths: [
			{ x: 300, y: 300 },
			{ x: 700, y: 700 },
			{ x: 300, y: 1100 },
		],
	},
	{
		x: 500,
		y: 700,
		possiblePaths: [
			{ x: 300, y: 700 },
			{ x: 300, y: 500 },
			{ x: 500, y: 500 },
			{ x: 700, y: 500 },
			{ x: 700, y: 700 },
			{ x: 700, y: 900 },
			{ x: 500, y: 900 },
			{ x: 300, y: 900 },
		],
		eatingPaths: [
			{ x: 100, y: 300 },
			{ x: 500, y: 300 },
			{ x: 900, y: 300 },
			{ x: 900, y: 700 },
			{ x: 900, y: 1100 },
			{ x: 500, y: 1100 },
			{ x: 100, y: 1100 },
			{ x: 100, y: 700 },
		],
	},
	{
		x: 700,
		y: 700,
		possiblePaths: [
			{ x: 500, y: 700 },
			{ x: 700, y: 500 },
			{ x: 900, y: 700 },
			{ x: 700, y: 900 },
		],
		eatingPaths: [
			{ x: 300, y: 700 },
			{ x: 700, y: 300 },
			{ x: 700, y: 1100 },
		],
	},
	{
		x: 900,
		y: 700,
		possiblePaths: [
			{ x: 700, y: 700 },
			{ x: 700, y: 500 },
			{ x: 900, y: 500 },
			{ x: 900, y: 900 },
			{ x: 700, y: 900 },
		],
		eatingPaths: [
			{ x: 500, y: 700 },
			{ x: 500, y: 300 },
			{ x: 900, y: 300 },
			{ x: 900, y: 1100 },
			{ x: 500, y: 1100 },
		],
	},
	{
		x: 100,
		y: 900,
		possiblePaths: [
			{ x: 100, y: 700 },
			{ x: 300, y: 900 },
			{ x: 100, y: 1100 },
		],
		eatingPaths: [
			{ x: 100, y: 500 },
			{ x: 500, y: 900 },
		],
	},
	{
		x: 300,
		y: 900,
		possiblePaths: [
			{ x: 100, y: 700 },
			{ x: 300, y: 700 },
			{ x: 500, y: 700 },
			{ x: 500, y: 900 },
			{ x: 500, y: 1100 },
			{ x: 300, y: 1100 },
			{ x: 100, y: 1100 },
			{ x: 100, y: 900 },
		],
		eatingPaths: [
			{ x: 300, y: 500 },
			{ x: 700, y: 500 },
			{ x: 700, y: 900 },
			{ x: 600, y: 1200 },
		],
	},
	{
		x: 500,
		y: 900,
		possiblePaths: [
			{ x: 300, y: 900 },
			{ x: 500, y: 700 },
			{ x: 700, y: 900 },
			{ x: 500, y: 1100 },
		],
		eatingPaths: [
			{ x: 100, y: 900 },
			{ x: 500, y: 500 },
			{ x: 900, y: 900 },
			{ x: 500, y: 1200 },
		],
	},
	{
		x: 700,
		y: 900,
		possiblePaths: [
			{ x: 500, y: 900 },
			{ x: 500, y: 700 },
			{ x: 700, y: 700 },
			{ x: 900, y: 700 },
			{ x: 900, y: 900 },
			{ x: 900, y: 1100 },
			{ x: 700, y: 1100 },
			{ x: 500, y: 1100 },
		],
		eatingPaths: [
			{ x: 300, y: 900 },
			{ x: 300, y: 500 },
			{ x: 700, y: 500 },
			{ x: 400, y: 1200 },
		],
	},
	{
		x: 900,
		y: 900,
		possiblePaths: [
			{ x: 700, y: 900 },
			{ x: 900, y: 700 },
			{ x: 900, y: 1100 },
		],
		eatingPaths: [
			{ x: 500, y: 900 },
			{ x: 900, y: 500 },
		],
	},
	{
		x: 100,
		y: 1100,
		possiblePaths: [
			{ x: 100, y: 900 },
			{ x: 300, y: 900 },
			{ x: 300, y: 1100 },
		],
		eatingPaths: [
			{ x: 100, y: 700 },
			{ x: 500, y: 700 },
			{ x: 500, y: 1100 },
		],
	},
	{
		x: 300,
		y: 1100,
		possiblePaths: [
			{ x: 100, y: 1100 },
			{ x: 300, y: 900 },
			{ x: 500, y: 1100 },
		],
		eatingPaths: [
			{ x: 300, y: 700 },
			{ x: 700, y: 1100 },
		],
	},
	{
		x: 500,
		y: 1100,
		possiblePaths: [
			{ x: 300, y: 1100 },
			{ x: 300, y: 900 },
			{ x: 500, y: 900 },
			{ x: 700, y: 900 },
			{ x: 700, y: 1100 },
			{ x: 600, y: 1200 },
			{ x: 500, y: 1200 },
			{ x: 400, y: 1200 },
		],
		eatingPaths: [
			{ x: 100, y: 1100 },
			{ x: 100, y: 700 },
			{ x: 500, y: 700 },
			{ x: 900, y: 700 },
			{ x: 900, y: 1100 },
			{ x: 700, y: 1300 },
			{ x: 500, y: 1300 },
			{ x: 300, y: 1300 },
		],
	},
	{
		x: 700,
		y: 1100,
		possiblePaths: [
			{ x: 500, y: 100 },
			{ x: 700, y: 900 },
			{ x: 900, y: 1100 },
		],
		eatingPaths: [
			{ x: 300, y: 1100 },
			{ x: 700, y: 700 },
		],
	},
	{
		x: 900,
		y: 1100,
		possiblePaths: [
			{ x: 700, y: 1100 },
			{ x: 700, y: 900 },
			{ x: 900, y: 900 },
		],
		eatingPaths: [
			{ x: 500, y: 1100 },
			{ x: 500, y: 700 },
			{ x: 900, y: 700 },
		],
	},
	{
		x: 400,
		y: 1200,
		possiblePaths: [
			{ x: 500, y: 1100 },
			{ x: 500, y: 1200 },
			{ x: 300, y: 1300 },
		],
		eatingPaths: [
			{ x: 700, y: 900 },
			{ x: 600, y: 1200 },
		],
	},
	{
		x: 500,
		y: 1200,
		possiblePaths: [
			{ x: 400, y: 1200 },
			{ x: 500, y: 1100 },
			{ x: 600, y: 1200 },
			{ x: 500, y: 1300 },
		],
		eatingPaths: [{ x: 500, y: 900 }],
	},
	{
		x: 600,
		y: 1200,
		possiblePaths: [
			{ x: 500, y: 1200 },
			{ x: 500, y: 1100 },
			{ x: 700, y: 1300 },
		],
		eatingPaths: [
			{ x: 400, y: 1200 },
			{ x: 300, y: 900 },
		],
	},
	{
		x: 300,
		y: 1300,
		possiblePaths: [
			{ x: 400, y: 1200 },
			{ x: 500, y: 1300 },
		],
		eatingPaths: [
			{ x: 500, y: 1100 },
			{ x: 700, y: 1300 },
		],
	},
	{
		x: 500,
		y: 1300,
		possiblePaths: [
			{ x: 300, y: 1300 },
			{ x: 500, y: 1200 },
			{ x: 700, y: 1300 },
		],
		eatingPaths: [{ x: 500, y: 1100 }],
	},
	{
		x: 700,
		y: 1300,
		possiblePaths: [
			{ x: 500, y: 1300 },
			{ x: 600, y: 1200 },
		],
		eatingPaths: [
			{ x: 300, y: 1300 },
			{ x: 500, y: 1100 },
		],
	},
];

export const suggestionPaths = derived([activePawn, pawnCoordinates], ([$activePawn, $pawnCoordinates]) => {
	// Get the current pawn's coordinates in the board.
	const activePawnCoordinate = getActivePawnCoordinate($activePawn);
	if (!activePawnCoordinate) {
		return [];
	}
	// Check if there are enemy pawns in the possible path.
	const enemiesInContact = getEnemiesInContact($pawnCoordinates, activePawnCoordinate, $activePawn);
	// Get the possible paths of the enemy, so we can search for the intersecting path.
	const enemyPossiblePaths = getEnemyPossiblePaths(enemiesInContact, $activePawn);

	const eatSuggestionCoordinates = getEatSuggestionCoordinates(
		activePawnCoordinate,
		enemyPossiblePaths,
		$pawnCoordinates
	);

	const possiblePaths = activePawnCoordinate.possiblePaths.filter(
		(coordinate) =>
			!$pawnCoordinates.some(
				(pawnCoordinate) => pawnCoordinate.x === coordinate.x && pawnCoordinate.y === coordinate.y
			)
	);

	return possiblePaths.concat(eatSuggestionCoordinates);
});
