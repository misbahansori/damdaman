<script lang="ts">
	import Pawn from '$lib/components/Pawn.svelte';
	import Board from '$lib/components/Board.svelte';
	import type { Pawn as PawnType } from '$lib/types/global.type';
	import { activePawn, numberOfTurns, pawnCoordinates, suggestionPaths, turn } from '$lib/store/state';
	import { checkStraightLine } from '$lib/helper';
	import {
		changeTurn,
		getActivePawnCoordinate,
		getEatSuggestionCoordinates,
		getEnemiesInContact,
		getSuggestionPath,
	} from '$lib/functions';

	function onPawnSelected(event: CustomEvent<PawnType>) {
		const { x, y, color } = event.detail;

		if (color !== $turn) {
			return;
		}

		if ($activePawn.x === x && $activePawn.y === y && $activePawn.color === color) {
			return;
		}

		if ($numberOfTurns >= 1) {
			return;
		}

		$activePawn = event.detail;

		$suggestionPaths = getSuggestionPath($activePawn, $pawnCoordinates);
	}

	function onPawnMoved(event: CustomEvent<PawnType>) {
		if (!$activePawn.x && !$activePawn.y && !$activePawn.color) {
			return;
		}

		const activePawnCoordinate = getActivePawnCoordinate($activePawn);

		const isEatingEnemy = activePawnCoordinate.eatingPaths.some(
			(coordinate) => coordinate.x === event.detail.x && coordinate.y === event.detail.y
		);

		if (isEatingEnemy) {
			const enemiesInContact = getEnemiesInContact($pawnCoordinates, activePawnCoordinate, $activePawn);

			const eatenEnemy = enemiesInContact.filter((pawnCoordinate) =>
				checkStraightLine([
					[$activePawn.x, $activePawn.y],
					[pawnCoordinate.x, pawnCoordinate.y],
					[event.detail.x, event.detail.y],
				])
			);

			const enemyIndex = $pawnCoordinates.findIndex((pawnCoordinate) =>
				eatenEnemy.some(
					(coordinate) => coordinate.x === pawnCoordinate.x && coordinate.y === pawnCoordinate.y
				)
			);

			if (enemyIndex === -1) {
				return;
			}

			$pawnCoordinates.splice(enemyIndex, 1);
		}

		const index = $pawnCoordinates.findIndex(
			(coordinate) => coordinate.x === $activePawn.x && coordinate.y === $activePawn.y
		);

		if (index === -1) {
			return;
		}

		$pawnCoordinates[index].x = event.detail.x;
		$pawnCoordinates[index].y = event.detail.y;

		$activePawn = { id: null, x: event.detail.x, y: event.detail.y, color: $turn };

		if (isEatingEnemy) {
			const activePawnCoordinate = getActivePawnCoordinate($activePawn);

			const eatSuggestionCoordinates = getEatSuggestionCoordinates(
				$pawnCoordinates,
				activePawnCoordinate,
				$activePawn
			);

			$numberOfTurns += 1;

			if (eatSuggestionCoordinates.length) {
				$suggestionPaths = eatSuggestionCoordinates;
				return;
			}
		}

		changeTurn();
	}
</script>

<svelte:head>
	<title>DamDaman</title>
</svelte:head>

<div class="w-full min-h-screen bg-gray-100">
	<div class="max-w-5xl flex mx-auto h-screen md:max-h-screen">
		<svg class="w-full" viewBox="0 0 1000 1400" fill="none" xmlns="http://www.w3.org/2000/svg">
			<Board on:click={onPawnMoved} />
			{#each $pawnCoordinates as pawn (pawn.id)}
				<Pawn on:click={onPawnSelected} {pawn} />
			{/each}
		</svg>
	</div>
</div>
