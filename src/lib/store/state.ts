import { Color, type Coordinate, type Pawn } from '$lib/types/global.type';
import { writable } from 'svelte/store';

export const pawnCoordinates = writable<Array<Pawn>>([
	{ id: 1, x: 200, y: 0, color: Color.RED },
	{ id: 2, x: 500, y: 0, color: Color.RED },
	{ id: 3, x: 500, y: 125, color: Color.RED },
	{ id: 4, x: 800, y: 0, color: Color.RED },
	{ id: 5, x: 325, y: 125, color: Color.RED },
	{ id: 6, x: 675, y: 125, color: Color.RED },
	{ id: 7, x: 100, y: 300, color: Color.RED },
	{ id: 8, x: 300, y: 300, color: Color.RED },
	{ id: 9, x: 500, y: 300, color: Color.RED },
	{ id: 10, x: 700, y: 300, color: Color.RED },
	{ id: 11, x: 900, y: 300, color: Color.RED },
	{ id: 12, x: 100, y: 500, color: Color.RED },
	{ id: 13, x: 300, y: 500, color: Color.RED },
	{ id: 14, x: 500, y: 500, color: Color.RED },
	{ id: 15, x: 700, y: 500, color: Color.RED },
	{ id: 16, x: 900, y: 500, color: Color.RED },
	{ id: 17, x: 100, y: 900, color: Color.BLUE },
	{ id: 18, x: 300, y: 900, color: Color.BLUE },
	{ id: 19, x: 500, y: 900, color: Color.BLUE },
	{ id: 20, x: 700, y: 900, color: Color.BLUE },
	{ id: 21, x: 900, y: 900, color: Color.BLUE },
	{ id: 22, x: 100, y: 1100, color: Color.BLUE },
	{ id: 23, x: 300, y: 1100, color: Color.BLUE },
	{ id: 24, x: 500, y: 1100, color: Color.BLUE },
	{ id: 25, x: 700, y: 1100, color: Color.BLUE },
	{ id: 26, x: 900, y: 1100, color: Color.BLUE },
	{ id: 27, x: 325, y: 1275, color: Color.BLUE },
	{ id: 28, x: 500, y: 1275, color: Color.BLUE },
	{ id: 29, x: 675, y: 1275, color: Color.BLUE },
	{ id: 30, x: 200, y: 1400, color: Color.BLUE },
	{ id: 31, x: 500, y: 1400, color: Color.BLUE },
	{ id: 32, x: 800, y: 1400, color: Color.BLUE },
]);

export const turn = writable<Color>(Color.BLUE);
export const numberOfTurns = writable<number>(0);

export const activePawn = writable<Pawn>({
	id: null,
	x: null,
	y: null,
	color: null,
});

export const suggestionPaths = writable<Coordinate[]>([]);
