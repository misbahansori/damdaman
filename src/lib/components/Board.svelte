<script lang="ts">
	import { isDebugging } from '$lib/variable';
	import { createEventDispatcher } from 'svelte';
	import SuggestionPawn from './SuggestionPawn.svelte';
	import { boardCoordinate, boardLines } from '$lib/store/board';
	import { dam, suggestionPaths } from '$lib/store/state';
	import { draw, fade } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';
	import { Color } from '$lib/types/global.type';

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

{#each $suggestionPaths as coordinate (`${coordinate.x},${coordinate.y}`)}
	<SuggestionPawn on:click={(event) => dispatch('click', event.detail)} {coordinate} />
{/each}

{#if isDebugging}
	{#each boardCoordinate as coordinate}
		<text x={coordinate.x + 50} y={coordinate.y + 40} class="text-gray-500 text-sm fill-current">
			[{coordinate.x},{coordinate.y}]
		</text>
	{/each}
{/if}

{#each $dam.coordinates as coordinates}
	<line
		in:draw={{ delay: 2200, easing: backInOut }}
		out:fade
		x1={coordinates.activePawn.x}
		y1={coordinates.activePawn.y}
		x2={coordinates.target.x}
		y2={coordinates.target.y}
		class="stroke-current {$dam.color === Color.RED ? 'text-red-500/30' : 'text-blue-500/30'}"
		stroke-width="64"
		stroke-linecap="round"
	/>
{/each}
