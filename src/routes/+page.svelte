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
		getDamCoordinates,
	} from '$lib/functions';
	import StartScreen from '$lib/components/StartScreen.svelte';

	function onPawnSelected(event: CustomEvent<PawnType>) {
		const { x, y, color } = event.detail;

		// If the selected pawn the enemy, then we can't select it
		if (color !== $turn) {
			return;
		}

		// If the pawn is already selected, then we can't select it
		if ($activePawn?.x === x && $activePawn?.y === y && $activePawn?.color === color) {
			return;
		}

		if ($numberOfTurns >= 1) {
			return;
		}

		if ($dam.count > 0) {
			return;
		}

		$activePawn = event.detail;

		if ($activePawn === null) return;

		$suggestionPaths = getSuggestionPath($activePawn, $pawnCoordinates, $isAlone);
	}

	function onPawnMoved(event: CustomEvent<PawnType>) {
		if (!$activePawn?.x && !$activePawn?.y && !$activePawn?.color) {
			return;
		}

		const activePawnCoordinate = getPawnCoordinate($activePawn);

		const enemiesInContact = getEnemiesInContact(
			$pawnCoordinates,
			activePawnCoordinate,
			$activePawn,
			$isAlone
		);

		const eatenEnemy = enemiesInContact.filter((pawnCoordinate) => {
			if ($activePawn === null) return;

			return checkStraightLine([
				[$activePawn?.x, $activePawn?.y],
				[pawnCoordinate.x, pawnCoordinate.y],
				[event.detail.x, event.detail.y],
			]);
		});

		// Check for DAM
		const currentPawnCoordinates = $pawnCoordinates
			.filter((pawn) => pawn.color === $activePawn?.color)
			.filter((pawn) => !(pawn.x === $activePawn?.x && pawn.y === $activePawn?.y));

		// Fix silly bug
		const currentPawnCoordinate = Object.assign(
			{},
			$pawnCoordinates.find((pawn) => pawn.x === $activePawn?.x && pawn.y === $activePawn?.y)
		);

		const tempDamCoorinates = getDamCoordinates(
			currentPawnCoordinates.concat(currentPawnCoordinate),
			$pawnCoordinates
		);

		if (tempDamCoorinates.length && !eatenEnemy.length) {
			$dam.showBanner = true;
			$dam.count = 3;
			$dam.coordinates = tempDamCoorinates;
			$dam.color = currentPawnCoordinate.color;

			setTimeout(() => {
				$dam.showBanner = false;
				setTimeout(() => {
					$dam.coordinates = [];
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
			(coordinate) => coordinate.x === $activePawn?.x && coordinate.y === $activePawn?.y
		);

		if (activePawnindex === -1) {
			return;
		}

		$pawnCoordinates[activePawnindex].x = event.detail.x;
		$pawnCoordinates[activePawnindex].y = event.detail.y;

		$activePawn = { id: 0, x: event.detail.x, y: event.detail.y, color: $turn };

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

		$dam.count = $dam.count - 1;

		if ($dam.count <= 0) {
			$dam = {
				color: null,
				coordinates: [],
				count: 0,
				showBanner: false,
			};
		}
	}

	$: redPawnKillCount = 16 - $pawnCoordinates.filter((pawn) => pawn.color === Color.RED).length;

	$: bluePawnKillCount = 16 - $pawnCoordinates.filter((pawn) => pawn.color === Color.BLUE).length;
</script>

<div class="w-full items-center min-h-screen bg-gray-100 relative">
	<StartScreen />

	<div class="wood bg-[url(/img/wood-2.jpeg)] absolute inset-0" />
	{#if $turn === Color.RED}
		<div transition:fade={{ duration: 150 }} class="bg-red-500 inset-x-0 top-0 absolute h-4" />
	{:else}
		<div transition:fade={{ duration: 150 }} class="bg-blue-500 inset-x-0 bottom-0 absolute h-4" />
	{/if}
	<div class="absolute flex gap-1 flex-wrap left-6 top-12">
		<svg class="h-6 w-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M34.5 47H31V43.5C31 42.1227 29.8773 41 28.5 41C27.1227 41 26 42.1227 26 43.5V47H22V43.5C22 42.1227 20.8773 41 19.5 41C18.1227 41 17 42.1227 17 43.5V47H13.5C11.5679 47 10 45.4321 10 43.5V37.5C10 37.4622 10 37.4454 10.0006 37.4219L10.014 36.8863L9.57561 36.5785C4.31467 32.8842 1 27.2559 1 21C1 10.0766 11.1665 1 24 1C36.8335 1 47 10.0766 47 21C47 27.2542 43.6854 32.8806 38.3466 36.5745L37.9156 36.8728V37.3969C37.9156 37.5588 37.9536 37.6968 38 37.8044V43.5C38 45.4321 36.4321 47 34.5 47ZM15 17C11.1383 17 8 20.1383 8 24C8 27.8617 11.1383 31 15 31C18.8617 31 22 27.8617 22 24C22 20.1383 18.8617 17 15 17ZM33 31C36.8617 31 40 27.8617 40 24C40 20.1383 36.8617 17 33 17C29.1383 17 26 20.1383 26 24C26 27.8617 29.1383 31 33 31Z"
				fill="white"
				stroke="black"
				stroke-width="2"
			/>
		</svg>
		<span class="text-white border-black">{redPawnKillCount}</span>
	</div>
	<div class="absolute flex gap-1 flex-wrap bottom-12 left-6">
		<svg class="h-6 w-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M34.5 47H31V43.5C31 42.1227 29.8773 41 28.5 41C27.1227 41 26 42.1227 26 43.5V47H22V43.5C22 42.1227 20.8773 41 19.5 41C18.1227 41 17 42.1227 17 43.5V47H13.5C11.5679 47 10 45.4321 10 43.5V37.5C10 37.4622 10 37.4454 10.0006 37.4219L10.014 36.8863L9.57561 36.5785C4.31467 32.8842 1 27.2559 1 21C1 10.0766 11.1665 1 24 1C36.8335 1 47 10.0766 47 21C47 27.2542 43.6854 32.8806 38.3466 36.5745L37.9156 36.8728V37.3969C37.9156 37.5588 37.9536 37.6968 38 37.8044V43.5C38 45.4321 36.4321 47 34.5 47ZM15 17C11.1383 17 8 20.1383 8 24C8 27.8617 11.1383 31 15 31C18.8617 31 22 27.8617 22 24C22 20.1383 18.8617 17 15 17ZM33 31C36.8617 31 40 27.8617 40 24C40 20.1383 36.8617 17 33 17C29.1383 17 26 20.1383 26 24C26 27.8617 29.1383 31 33 31Z"
				fill="white"
				stroke="black"
				stroke-width="2"
			/>
		</svg>
		<span class="text-white border-black">{bluePawnKillCount}</span>
	</div>
	<div class="absolute bottom-10 right-4 z-10 flex items-center justify-center">
		<a href="https://github.com/misbahansori/damdaman" class="p-2" target="__blank">
			<svg
				class="fill-current text-white cursor-pointer drop-shadow-px w-6 h-6"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z"
				/>
			</svg>
		</a>
	</div>
	<main class="sm:max-w-xl h-screen flex mx-auto">
		<div class="flex relative w-full py-6">
			<svg class="w-full" viewBox="0 0 1000 1600" fill="none" xmlns="http://www.w3.org/2000/svg">
				<Board on:click={onPawnMoved} />
				{#each $pawnCoordinates as pawn (pawn.id)}
					<Pawn
						on:click={onPawnSelected}
						on:removePawn={removePawn}
						{pawn}
						isActive={$dam.color && $dam.coordinates.length === 0 && $dam.showBanner === false
							? $dam.color === pawn.color
							: $activePawn?.x === pawn.x && $activePawn?.y === pawn.y}
					/>
				{/each}
			</svg>
		</div>
		{#if $dam.showBanner}
			<div
				in:fly={{ y: 200, delay: 200 }}
				out:fade={{ duration: 200 }}
				class="absolute flex items-center justify-center inset-0"
			>
				<div
					class="py-5 w-full flex items-center justify-center shadow-2xl
					{$dam.color === Color.RED ? 'bg-red-500/80' : 'bg-blue-500/80'}"
				>
					<span class="text-white text-4xl font-bold tracking-wide drop-shadow-px">DAM</span>
				</div>
			</div>
		{/if}
	</main>
</div>

<style>
	.wood {
		background-repeat: repeat;
		background-size: 250px;
	}
	.border-black {
		-webkit-text-stroke: 1px black;
	}
</style>
