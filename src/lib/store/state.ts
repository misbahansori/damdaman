import { Color, type Pawn } from '$lib/types/coordinate.type';
import { writable } from 'svelte/store';

export const pawnCoordinates = writable<Array<Pawn>>([
	{ x: 300, y: 100, color: Color.RED },
	{ x: 500, y: 100, color: Color.RED },
	{ x: 500, y: 200, color: Color.RED },
	{ x: 700, y: 100, color: Color.RED },
	{ x: 400, y: 200, color: Color.RED },
	{ x: 600, y: 200, color: Color.RED },
	{ x: 100, y: 300, color: Color.RED },
	{ x: 300, y: 300, color: Color.RED },
	{ x: 500, y: 300, color: Color.RED },
	{ x: 700, y: 300, color: Color.RED },
	{ x: 900, y: 300, color: Color.RED },
	{ x: 100, y: 500, color: Color.RED },
	{ x: 300, y: 500, color: Color.RED },
	{ x: 500, y: 500, color: Color.RED },
	{ x: 700, y: 500, color: Color.RED },
	{ x: 900, y: 500, color: Color.RED },
	{ x: 100, y: 900, color: Color.BLUE },
	{ x: 300, y: 900, color: Color.BLUE },
	{ x: 500, y: 900, color: Color.BLUE },
	{ x: 700, y: 900, color: Color.BLUE },
	{ x: 900, y: 900, color: Color.BLUE },
	{ x: 100, y: 1100, color: Color.BLUE },
	{ x: 300, y: 1100, color: Color.BLUE },
	{ x: 500, y: 1100, color: Color.BLUE },
	{ x: 700, y: 1100, color: Color.BLUE },
	{ x: 900, y: 1100, color: Color.BLUE },
	{ x: 400, y: 1200, color: Color.BLUE },
	{ x: 500, y: 1200, color: Color.BLUE },
	{ x: 600, y: 1200, color: Color.BLUE },
	{ x: 300, y: 1300, color: Color.BLUE },
	{ x: 500, y: 1300, color: Color.BLUE },
	{ x: 700, y: 1300, color: Color.BLUE },
]);

export const turn = writable<Color>(Color.BLUE);

export function changeTurn(): void {
	turn.update((t) => {
		if (t === Color.BLUE) {
			return Color.RED;
		} else {
			return Color.BLUE;
		}
	});
}

export const activePawn = writable<Pawn>({
	x: null,
	y: null,
	color: null,
});

export const suggestPath = writable(false);
