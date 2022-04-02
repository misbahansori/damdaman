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
		damCoordinates,
		turn,
		damCount,
	} from '$lib/store/state';
	import { checkStraightLine } from '$lib/helper';
	import { draw, fade, fly } from 'svelte/transition';
	import {
		changeTurn,
		getPawnCoordinate,
		getEatSuggestionCoordinates,
		getEnemiesInContact,
		getSuggestionPath,
		getDamCoordinates,
	} from '$lib/functions';
	import { backInOut } from 'svelte/easing';

	let showDamBanner = false;

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

		if ($damCount > 0) {
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
		const currentPawnCoordinates = $pawnCoordinates
			.filter((pawn) => pawn.color === $activePawn.color)
			.filter((pawn) => !(pawn.x === $activePawn.x && pawn.y === $activePawn.y));

		// Fix silly bug
		const currentPawnCoordinate = Object.assign(
			{},
			$pawnCoordinates.find((pawn) => pawn.x === $activePawn.x && pawn.y === $activePawn.y)
		);

		const tempDamCoorinates = getDamCoordinates(
			currentPawnCoordinates.concat(currentPawnCoordinate),
			$pawnCoordinates,
			$isAlone
		);

		if (tempDamCoorinates.length && !eatenEnemy.length) {
			showDamBanner = true;
			$damCount = 3;
			$damCoordinates = tempDamCoorinates;

			setTimeout(() => {
				showDamBanner = false;
				setTimeout(() => {
					$damCoordinates = [];
					$dam = currentPawnCoordinate.color;
					console.log($dam);
				}, 2500);
			}, 2000);
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

	function removePawn(event: CustomEvent<PawnType>) {
		$pawnCoordinates = $pawnCoordinates.filter(
			(pawn) => !(pawn.x === event.detail.x && pawn.y === event.detail.y)
		);

		$damCount = $damCount - 1;

		if ($damCount <= 0) {
			$dam = null;
		}
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
				{#each $damCoordinates as coordinates}
					<line
						in:draw={{ delay: 2200, easing: backInOut }}
						out:fade
						x1={coordinates.activePawn.x}
						y1={coordinates.activePawn.y}
						x2={coordinates.target.x}
						y2={coordinates.target.y}
						class="stroke-current text-red-500/40"
						stroke-width="64"
						stroke-linecap="round"
					/>
				{/each}
				{#each $pawnCoordinates as pawn (pawn.id)}
					<Pawn
						on:click={onPawnSelected}
						on:removePawn={removePawn}
						{pawn}
						isActive={$dam ? $dam === pawn.color : $activePawn.x === pawn.x && $activePawn.y === pawn.y}
					/>
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
		{#if showDamBanner}
			<div
				in:fly={{ y: 200, delay: 200 }}
				out:fade={{ duration: 200 }}
				class="absolute flex items-center justify-center inset-0"
			>
				<div
					class="py-5 w-full flex items-center justify-center 
					{$dam === Color.RED ? 'bg-blue-500/80' : 'bg-red-500/80'}"
				>
					<span class="text-white text-4xl font-bold tracking-wide">DAM</span>
				</div>
			</div>
		{/if}
	</div>
</div>
