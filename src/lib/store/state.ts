import { Color, type Pawn } from '$lib/types/coordinate.type';
import { writable } from 'svelte/store';

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
