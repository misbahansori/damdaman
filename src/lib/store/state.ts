import { writable } from 'svelte/store';

export const turn = writable('blue');

export function changeTurn() {
	turn.update((t) => {
		if (t === 'blue') {
			return 'red';
		} else {
			return 'blue';
		}
	});
}

export const activePawn = writable<{ x: number; y: number; color: string }>({
	x: null,
	y: null,
	color: null,
});

export const suggestPath = writable(false);
