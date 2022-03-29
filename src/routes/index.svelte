<script lang="ts">
	import Pawn from '$lib/components/Pawn.svelte';
	import Board from '$lib/components/Board.svelte';
	import { Color, type Pawn as PawnType } from '$lib/types/global.type';
	import { activePawn, numberOfTurns, pawnCoordinates, suggestionPaths, turn } from '$lib/store/state';
	import { checkStraightLine } from '$lib/helper';
	import { fade } from 'svelte/transition';
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

		console.log($activePawn);

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

<div class="w-full items-center min-h-screen bg-gray-100 relative bg-[url(/img/wood-2.jpeg)]">
	{#if $turn === Color.RED}
		<div transition:fade={{ duration: 150 }} class="bg-[#FF005C] inset-x-0 top-0 absolute h-4" />
	{:else}
		<div transition:fade={{ duration: 150 }} class="bg-[#426AF5] inset-x-0 bottom-0 absolute h-4" />
	{/if}
	<div class="sm:max-w-xl h-screen flex mx-auto">
		<div class=" flex relative w-full py-6">
			<svg class="w-full" viewBox="0 0 1000 1500" fill="none" xmlns="http://www.w3.org/2000/svg">
				<Board on:click={onPawnMoved} />
				{#each $pawnCoordinates as pawn (pawn.id)}
					<Pawn on:click={onPawnSelected} {pawn} />
				{/each}
				<defs>
					<filter id="filter_red" primitiveUnits="objectBoundingBox">
						<feDropShadow dx="2" dy="4" stdDeviation="8" flood-color="#C32323" flood-opacity="100" />
					</filter>
					<linearGradient id="gradient_red" gradientTransform="rotate(45)">
						<stop offset="0.2" stop-color="#FF5353" />
						<stop offset="0.8" stop-color="#EB0505" />
					</linearGradient>
					<filter id="filter_blue" primitiveUnits="objectBoundingBox">
						<feDropShadow dx="2" dy="4" stdDeviation="8" flood-color="#C32323" flood-opacity="100" />
					</filter>
					<linearGradient id="gradient_blue" gradientTransform="rotate(45)">
						<stop offset="0.2" stop-color="#6486FF" />
						<stop offset="0.8" stop-color="#0033E7" />
					</linearGradient>
				</defs>
			</svg>
		</div>
	</div>
</div>
