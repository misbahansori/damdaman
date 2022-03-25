<script>
	import Board from '$lib/components/Board.svelte';
	import Pawn from '$lib/components/Pawn.svelte';
	import { activePawn, changeTurn, turn } from '$lib/store/state';

	let pawnCoordinates = [
		{ x: 300, y: 100, color: 'red' },
		{ x: 500, y: 100, color: 'red' },
		{ x: 500, y: 200, color: 'red' },
		{ x: 700, y: 100, color: 'red' },
		{ x: 400, y: 200, color: 'red' },
		{ x: 600, y: 200, color: 'red' },
		{ x: 100, y: 300, color: 'red' },
		{ x: 300, y: 300, color: 'red' },
		{ x: 500, y: 300, color: 'red' },
		{ x: 700, y: 300, color: 'red' },
		{ x: 900, y: 300, color: 'red' },
		{ x: 100, y: 500, color: 'red' },
		{ x: 300, y: 500, color: 'red' },
		{ x: 500, y: 500, color: 'red' },
		{ x: 700, y: 500, color: 'red' },
		{ x: 900, y: 500, color: 'red' },
		{ x: 100, y: 900, color: 'blue' },
		{ x: 300, y: 900, color: 'blue' },
		{ x: 500, y: 900, color: 'blue' },
		{ x: 700, y: 900, color: 'blue' },
		{ x: 900, y: 900, color: 'blue' },
		{ x: 100, y: 1100, color: 'blue' },
		{ x: 300, y: 1100, color: 'blue' },
		{ x: 500, y: 1100, color: 'blue' },
		{ x: 700, y: 1100, color: 'blue' },
		{ x: 900, y: 1100, color: 'blue' },
		{ x: 400, y: 1200, color: 'blue' },
		{ x: 500, y: 1200, color: 'blue' },
		{ x: 600, y: 1200, color: 'blue' },
		{ x: 300, y: 1300, color: 'blue' },
		{ x: 500, y: 1300, color: 'blue' },
		{ x: 700, y: 1300, color: 'blue' },
	];

	function onPawnSelected(event) {
		const { x, y, color } = event.detail;
		// highlightPossiblePawn(x, y);

		if (color !== $turn) {
			return;
		}

		$activePawn = { x, y, color };
	}

	function findPawn(x, y) {
		return pawnCoordinates.findIndex((pawn) => pawn.x === x && pawn.y === y);
	}

	function movePawn(event) {
		if (!$activePawn.x && !$activePawn.y && !$activePawn.color) {
			return;
		}
		const index = findPawn($activePawn.x, $activePawn.y);

		if (index === -1) {
			return;
		}
		pawnCoordinates[index].x = event.detail.x;
		pawnCoordinates[index].y = event.detail.y;

		$activePawn = {
			x: null,
			y: null,
			color: null,
		};

		// $activePawn = {
		// 	x: event.detail.x,
		// 	y: event.detail.y,
		// 	color: $activePawn.color
		// };

		changeTurn();
	}

	function highlightPossiblePawn(x, y) {
		const index = findPawn(x, y);

		if (index === -1) {
			return;
		}

		const pawn = pawnCoordinates[index];

		if (pawn.color !== $turn) {
			return;
		}

		const paths = pawn.paths;

		for (let i = 0; i < paths.length; i++) {
			const path = paths[i];

			const pathIndex = findPawn(path.x, path.y);

			if (pathIndex === -1) {
				continue;
			}

			const pathPawn = pawnCoordinates[pathIndex];

			if (pathPawn.color === $turn) {
				continue;
			}

			pathPawn.highlighted = true;
		}
	}
</script>

<div class="w-full min-h-screen bg-gray-100">
	<div class="max-w-5xl flex mx-auto max-h-screen">
		<svg class="w-full" viewBox="0 0 1000 1400" fill="none" xmlns="http://www.w3.org/2000/svg">
			<Board on:click={movePawn} />
			{#each pawnCoordinates as coordinate}
				<Pawn
					on:click={onPawnSelected}
					cx={coordinate.x}
					cy={coordinate.y}
					color={coordinate.color}
				/>
			{/each}
		</svg>
	</div>
	<div class="absolute right-4 top-4 bg-white rounded-md p-4 w-64">
		<table>
			<tr>
				<td>Turn : </td>
				<td>{$turn}</td>
			</tr>
		</table>
	</div>
</div>
