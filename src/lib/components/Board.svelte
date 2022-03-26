<script lang="ts">
	import { boardCoordinate } from '$lib/store/board';
	import { activePawn, pawnCoordinates, suggestPath } from '$lib/store/state';
	import { Color, type Coordinate, type PawnCoordinate } from '$lib/types/coordinate.type';
	import { isDebugging } from '$lib/variable';
	import { createEventDispatcher } from 'svelte';
	import SuggestionPawn from './SuggestionPawn.svelte';

	const boardLines = [
		{ x1: '100', y1: '300', x2: '900', y2: '300' },
		{ x1: '100', y1: '500', x2: '900', y2: '500' },
		{ x1: '100', y1: '700', x2: '900', y2: '700' },
		{ x1: '100', y1: '900', x2: '900', y2: '900' },
		{ x1: '100', y1: '1100', x2: '900', y2: '1100' },
		{ x1: '100', y1: '1100', x2: '100', y2: '300' },
		{ x1: '300', y1: '1100', x2: '300', y2: '300' },
		{ x1: '500', y1: '1300', x2: '500', y2: '100' },
		{ x1: '700', y1: '1100', x2: '700', y2: '300' },
		{ x1: '900', y1: '1100', x2: '900', y2: '300' },
		{ x1: '100', y1: '700', x2: '700', y2: '1300' },
		{ x1: '900', y1: '700', x2: '300', y2: '1300' },
		{ x1: '100', y1: '700', x2: '700', y2: '100' },
		{ x1: '900', y1: '700', x2: '300', y2: '100' },
		{ x1: '300', y1: '100', x2: '700', y2: '100' },
		{ x1: '300', y1: '1300', x2: '700', y2: '1300' },
		{ x1: '400', y1: '200', x2: '600', y2: '200' },
		{ x1: '400', y1: '1200', x2: '600', y2: '1200' },
		{ x1: '100', y1: '300', x2: '900', y2: '1100' },
		{ x1: '900', y1: '300', x2: '100', y2: '1100' },
	];

	let currentPawnCoordinate: PawnCoordinate = {
		x: null,
		y: null,
		possiblePaths: [],
		eatingPaths: [],
	};

	$: {
		currentPawnCoordinate =
			boardCoordinate.find(
				(coordinate) => coordinate.x === $activePawn.x && coordinate.y === $activePawn.y
			) ?? currentPawnCoordinate;
	}

	const dispatch = createEventDispatcher();
</script>

{#each boardLines as line}
	<line
		x1={line.x1}
		y1={line.y1}
		x2={line.x2}
		y2={line.y2}
		stroke="#525252"
		stroke-linecap="round"
		stroke-dasharray="6 6"
	/>
{/each}
{#if $suggestPath && currentPawnCoordinate}
	{#each currentPawnCoordinate.possiblePaths as possiblePath}
		<SuggestionPawn
			on:click={(event) => dispatch('click', event.detail)}
			coordinate={possiblePath}
		/>

		{#if $pawnCoordinates.some((pawnCoordinate) => pawnCoordinate.x === possiblePath.x && pawnCoordinate.y === possiblePath.y && pawnCoordinate.color !== $activePawn.color)}
			{#each currentPawnCoordinate.eatingPaths as eatingPath}
				<SuggestionPawn
					on:click={(event) => dispatch('click', event.detail)}
					coordinate={eatingPath}
				/>
			{/each}
		{/if}
	{/each}
{/if}

{#if isDebugging}
	{#each boardCoordinate as coordinate}
		<text x={coordinate.x + 40} y={coordinate.y - 10} class="text-gray-500 text-sm fill-current">
			[{coordinate.x},{coordinate.y}]
		</text>
	{/each}
{/if}
