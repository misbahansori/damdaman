<script lang="ts">
	import { boardCoordinate } from '$lib/store/board';
	import type { Pawn, PawnCoordinate } from '$lib/types/coordinate.type';
	import { createEventDispatcher } from 'svelte';
	import EatSuggestionCoordinate from './EatSuggestionCoordinate.svelte';

	export let enemiesInContact: Array<Pawn> = [];
	export let currentPawnCoordinate: PawnCoordinate;

	const dispatch = createEventDispatcher();
</script>

{#each enemiesInContact as enemyCoordinate}
	{@const possibleEnemyPaths = boardCoordinate.find(
		(coordinate) => coordinate.x === enemyCoordinate.x && coordinate.y === enemyCoordinate.y
	).possiblePaths}

	{@const eatSuggestionCoordinates = currentPawnCoordinate.eatingPaths.filter((coordinate) =>
		possibleEnemyPaths.some(
			(possiblePath) => possiblePath.x === coordinate.x && possiblePath.y === coordinate.y
		)
	)}
	<EatSuggestionCoordinate
		on:click={(event) => dispatch('click', event.detail)}
		{eatSuggestionCoordinates}
	/>
{/each}
