import { checkStraightLine } from './../helper';
import type { PawnCoordinate } from '$lib/types/global.type';
import { derived } from 'svelte/store';
import { activePawn, pawnCoordinates } from '$lib/store/state';

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

export const suggestionPaths = derived(
	[activePawn, pawnCoordinates],
	([$activePawn, $pawnCoordinates]) => {
		// Get the current pawn's coordinates in the board.
		const activePawnCoordinate: PawnCoordinate = boardCoordinate.find(
			(coordinate) => coordinate.x === $activePawn.x && coordinate.y === $activePawn.y
		);
		if (!activePawnCoordinate) {
			return [];
		}
		// Check if there are enemy pawns in the possible path.
		const enemiesInContact = $pawnCoordinates.filter((pawnCoordinate) =>
			activePawnCoordinate.possiblePaths.some(
				(coordinate) =>
					coordinate.x === pawnCoordinate.x &&
					coordinate.y === pawnCoordinate.y &&
					$activePawn.color !== pawnCoordinate.color
			)
		);
		// Get the possible paths of the enemy, so we can search for the intersecting path.
		const possibleEnemyPaths = boardCoordinate
			.filter((coordinate) =>
				enemiesInContact.some((enemy) => enemy.x === coordinate.x && enemy.y === coordinate.y)
			)
			.flatMap((enemy) =>
				enemy.possiblePaths.filter((coordinate) => {
					return checkStraightLine([
						[$activePawn.x, $activePawn.y],
						[enemy.x, enemy.y],
						[coordinate.x, coordinate.y],
					]);
				})
			);

		const eatSuggestionCoordinates = activePawnCoordinate.eatingPaths.filter((coordinate) =>
			possibleEnemyPaths.some(
				(possiblePath) => possiblePath.x === coordinate.x && possiblePath.y === coordinate.y
			)
		);

		return activePawnCoordinate.possiblePaths.concat(eatSuggestionCoordinates);
	}
);
