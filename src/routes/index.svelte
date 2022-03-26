<script lang="ts">
	import Board from '$lib/components/Board.svelte';
	import Pawn from '$lib/components/Pawn.svelte';
	import { activePawn, changeTurn, suggestPath, turn } from '$lib/store/state';
	import { Color, type Pawn as PawnType } from '$lib/types/coordinate.type';
	import { isDebugging } from '$lib/variable';

	let pawnCoordinates: Array<PawnType> = [
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
	];

	function onPawnSelected(event: CustomEvent<PawnType>) {
		const { x, y, color } = event.detail;

		if (color !== $turn) {
			return;
		}

		$suggestPath = true;

		$activePawn = { x, y, color };
	}

	function findPawn(x: number, y: number) {
		return pawnCoordinates.findIndex((pawn) => pawn.x === x && pawn.y === y);
	}

	function movePawn(event: CustomEvent<{ x: number; y: number; color: string }>) {
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

		$suggestPath = false;

		changeTurn();
	}
</script>

<div class="w-full min-h-screen bg-gray-100">
	<div class="max-w-5xl flex mx-auto h-screen md:max-h-screen">
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
	{#if isDebugging}
		<div class="absolute right-4 top-4 bg-white rounded-md p-4 w-64">
			<table>
				<tr>
					<td>Turn : </td>
					<td>{$turn}</td>
				</tr>
			</table>
		</div>
	{/if}
</div>
