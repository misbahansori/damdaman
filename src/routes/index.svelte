<script lang="ts">
	import { isDebugging } from '$lib/variable';
	import Pawn from '$lib/components/Pawn.svelte';
	import Board from '$lib/components/Board.svelte';
	import { Color, type Pawn as PawnType } from '$lib/types/global.type';
	import { activePawn, changeTurn, pawnCoordinates, suggestPath, turn } from '$lib/store/state';
	import { checkStraightLine } from '$lib/helper';
	import { getActivePawnCoordinate, getEatSuggestionCoordinates, getEnemiesInContact } from '$lib/functions';

	function onPawnSelected(event: CustomEvent<PawnType>) {
		const { id, x, y, color } = event.detail;

		if (color !== $turn || ($activePawn.x === x && $activePawn.y === y && $activePawn.color === color)) {
			return;
		}

		$suggestPath = true;

		$activePawn = { id, x, y, color };
	}

	function findPawn(x: number, y: number) {
		return $pawnCoordinates.findIndex((pawn) => pawn.x === x && pawn.y === y);
	}

	function movePawn(event: CustomEvent<{ x: number; y: number; color: string }>) {
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

		const index = findPawn($activePawn.x, $activePawn.y);

		if (index === -1) {
			return;
		}

		$pawnCoordinates[index].x = event.detail.x;
		$pawnCoordinates[index].y = event.detail.y;

		$activePawn = { id: null, x: event.detail.x, y: event.detail.y, color: $turn };

		$activePawn = {
			id: null,
			x: null,
			y: null,
			color: null,
		};

		$suggestPath = false;

		changeTurn();
	}
</script>

<div class="w-full min-h-screen bg-gray-100">
	<div class="max-w-5xl flex mx-auto h-screen md:max-h-screen">
		<svg class="w-full" viewBox="0 0 1000 1400" fill="none" xmlns="http://www.w3.org/2000/svg">
			<Board on:click={movePawn} />
			{#each $pawnCoordinates as coordinate (coordinate.id)}
				<Pawn on:click={onPawnSelected} cx={coordinate.x} cy={coordinate.y} color={coordinate.color} />
			{/each}
		</svg>
	</div>
	{#if isDebugging}
		<div class="absolute right-4 top-4 bg-white rounded-md p-4 shadow-lg">
			<table>
				<tr>
					<td>Turn : </td>
					<td>
						<div
							class="px-2 py-0.5"
							class:bg-red-500={$turn === Color.RED}
							class:bg-blue-500={$turn === Color.BLUE}
						>
							{$turn}
						</div>
					</td>
				</tr>
			</table>
		</div>
	{/if}
</div>
