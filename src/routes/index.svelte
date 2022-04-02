<script lang="ts">
	import Pawn from '$lib/components/Pawn.svelte';
	import Board from '$lib/components/Board.svelte';
	import { Color, type Pawn as PawnType } from '$lib/types/global.type';
	import {
		activePawn,
		dam,
		isAlone,
		numberOfTurns,
		pawnCoordinates,
		suggestionPaths,
		turn,
	} from '$lib/store/state';
	import { checkStraightLine } from '$lib/helper';
	import { fade, fly } from 'svelte/transition';
	import {
		changeTurn,
		getPawnCoordinate,
		getEatSuggestionCoordinates,
		getEnemiesInContact,
		getSuggestionPath,
		getEnemiesToEat,
	} from '$lib/functions';

	function onPawnSelected(event: CustomEvent<PawnType>) {
		const { x, y, color } = event.detail;

		// If the selected pawn the enemy, then we can't select it
		if (color !== $turn) {
			return;
		}

		// If the pawn is already selected, then we can't select it
		if ($activePawn.x === x && $activePawn.y === y && $activePawn.color === color) {
			return;
		}

		if ($numberOfTurns >= 1) {
			return;
		}

		$activePawn = event.detail;

		$suggestionPaths = getSuggestionPath($activePawn, $pawnCoordinates, $isAlone);
	}

	function onPawnMoved(event: CustomEvent<PawnType>) {
		if (!$activePawn.x && !$activePawn.y && !$activePawn.color) {
			return;
		}

		const activePawnCoordinate = getPawnCoordinate($activePawn);

		const enemiesInContact = getEnemiesInContact(
			$pawnCoordinates,
			activePawnCoordinate,
			$activePawn,
			$isAlone
		);

		const eatenEnemy = enemiesInContact.filter((pawnCoordinate) =>
			checkStraightLine([
				[$activePawn.x, $activePawn.y],
				[pawnCoordinate.x, pawnCoordinate.y],
				[event.detail.x, event.detail.y],
			])
		);

		// Check for DAM
		const currentPawnCoordinates = $pawnCoordinates.filter((pawn) => pawn.color === $activePawn.color);

		const enemiesToEat = getEnemiesToEat(currentPawnCoordinates, $pawnCoordinates, $isAlone);

		if (enemiesToEat && !eatenEnemy.length) {
			$dam = $activePawn.color;
			setTimeout(() => {
				$dam = null;
			}, 2500);
		}

		if (eatenEnemy.length > 0) {
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

		const activePawnindex = $pawnCoordinates.findIndex(
			(coordinate) => coordinate.x === $activePawn.x && coordinate.y === $activePawn.y
		);

		if (activePawnindex === -1) {
			return;
		}

		$pawnCoordinates[activePawnindex].x = event.detail.x;
		$pawnCoordinates[activePawnindex].y = event.detail.y;

		$activePawn = { id: null, x: event.detail.x, y: event.detail.y, color: $turn };

		if (eatenEnemy.length > 0) {
			const activePawnCoordinate = getPawnCoordinate($activePawn);

			const eatSuggestionCoordinates = getEatSuggestionCoordinates(
				$pawnCoordinates,
				activePawnCoordinate,
				$activePawn,
				$isAlone
			);

			$numberOfTurns += 1;

			if (eatSuggestionCoordinates.length) {
				$suggestionPaths = eatSuggestionCoordinates;
				return;
			}
		}

		changeTurn();
	}

	$: redPawnKillCount = 16 - $pawnCoordinates.filter((pawn) => pawn.color === Color.RED).length;

	$: bluePawnKillCount = 16 - $pawnCoordinates.filter((pawn) => pawn.color === Color.BLUE).length;
</script>

<svelte:head>
	<title>DamDaman</title>
</svelte:head>

<div class="w-full items-center min-h-screen bg-gray-100 relative">
	{#if $turn === Color.RED}
		<div transition:fade={{ duration: 150 }} class="bg-[#FF005C] inset-x-0 top-0 absolute h-4" />
	{:else}
		<div transition:fade={{ duration: 150 }} class="bg-[#426AF5] inset-x-0 bottom-0 absolute h-4" />
	{/if}
	<div class="sm:max-w-xl h-screen flex mx-auto">
		<div class="flex relative w-full py-6">
			<svg class="w-full" viewBox="0 0 1000 1600" fill="none" xmlns="http://www.w3.org/2000/svg">
				<Board on:click={onPawnMoved} />
				{#each $pawnCoordinates as pawn (pawn.id)}
					<Pawn on:click={onPawnSelected} {pawn} />
				{/each}
			</svg>
			<div class="absolute flex flex-col gap-0.5 h-20 flex-wrap left-6 top-6">
				{#each Array(redPawnKillCount) as _}
					<div
						transition:fade={{ duration: 300 }}
						class="w-3 h-3 bg-red-500 border-2 border-red-300 rounded-full"
					/>
				{/each}
			</div>
			<div dir="rtl" class="absolute flex flex-col gap-0.5 h-20 flex-wrap right-6 bottom-6">
				{#each Array(bluePawnKillCount) as _}
					<div
						transition:fade={{ duration: 300 }}
						class="w-3 h-3 bg-blue-500 border-2 border-blue-300 rounded-full"
					/>
				{/each}
			</div>
		</div>
		{#if $dam}
			<div
				in:fly={{ y: 200 }}
				out:fade={{ duration: 200 }}
				class="absolute flex items-center justify-center inset-0"
			>
				<div
					class="py-5 w-full flex items-center justify-center 
					{$dam === Color.RED ? 'bg-red-500/80' : 'bg-blue-500/80'}"
				>
					<span class="text-white text-4xl font-bold tracking-wide">DAM</span>
				</div>
			</div>
		{/if}
	</div>
</div>
