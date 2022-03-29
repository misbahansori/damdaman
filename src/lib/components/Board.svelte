<script lang="ts">
	import { isDebugging } from '$lib/variable';
	import { createEventDispatcher } from 'svelte';
	import SuggestionPawn from './SuggestionPawn.svelte';
	import { boardCoordinate, boardLines } from '$lib/store/board';
	import { suggestionPaths } from '$lib/store/state';

	const dispatch = createEventDispatcher();
</script>

{#each boardLines as line}
	<line
		x1={line.x1}
		y1={line.y1 + 50}
		x2={line.x2}
		y2={line.y2 + 50}
		stroke="#fff"
		stroke-linecap="round"
		stroke-dasharray="6 6"
	/>
{/each}

{#each $suggestionPaths as coordinate}
	<SuggestionPawn on:click={(event) => dispatch('click', event.detail)} {coordinate} />
{/each}

{#if isDebugging}
	{#each boardCoordinate as coordinate}
		<text x={coordinate.x + 40} y={coordinate.y + 40} class="text-gray-500 text-sm fill-current">
			[{coordinate.x},{coordinate.y}]
		</text>
	{/each}
{/if}
