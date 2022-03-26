<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SuggestionPawn from './SuggestionPawn.svelte';
	import type { Coordinate } from '$lib/types/coordinate.type';

	export let eatSuggestionCoordinates: Array<Coordinate> = [];

	const dispatch = createEventDispatcher();
</script>

{#each eatSuggestionCoordinates as coordinate, index (index)}
	<SuggestionPawn on:click={(event) => dispatch('click', event.detail)} {coordinate} />
{/each}
