<script>
	import Board from '$lib/components/Board.svelte';
	import Pawn from '$lib/components/Pawn.svelte';
	import { activePawn } from '$lib/store/state';

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
		{ x: 700, y: 1300, color: 'blue' }
	];

	function onPawnClick(event) {
		$activePawn = {
			x: event.detail.x,
			y: event.detail.y,
			color: event.detail.color
		};
	}

	function findPawn(x, y, color) {
		return pawnCoordinates.findIndex((pawn) => pawn.x === x && pawn.y === y);
	}

	function movePawn(event) {
		if (!$activePawn.x && !$activePawn.y && !$activePawn.color) {
			return;
		}
		const index = findPawn($activePawn.x, $activePawn.y, $activePawn.color);

		if (index === -1) {
			return;
		}
		pawnCoordinates[index].x = event.detail.x;
		pawnCoordinates[index].y = event.detail.y;

		$activePawn = {
			x: event.detail.x,
			y: event.detail.y,
			color: $activePawn.color
		};
	}
</script>

<div class="w-full min-h-screen">
	<div class="max-w-5xl flex mx-auto max-h-screen">
		<svg class="w-full" viewBox="0 0 1000 1400" fill="none" xmlns="http://www.w3.org/2000/svg">
			<Board on:click={movePawn} />
			{#each pawnCoordinates as coordinate}
				<Pawn on:click={onPawnClick} cx={coordinate.x} cy={coordinate.y} color={coordinate.color} />
			{/each}
		</svg>
	</div>
</div>

<div class="flex flex-col">
	{#each pawnCoordinates as coordinate}
		<div class="flex items-center">
			<input type="text" bind:value={coordinate.x} />
			<input type="text" bind:value={coordinate.y} />
		</div>
	{/each}
</div>
