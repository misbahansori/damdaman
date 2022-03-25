<script>
	import Board from '$lib/components/Board.svelte';
	import Pawn from '$lib/components/Pawn.svelte';

	const redCoordinate = [
		{ x: 300, y: 100 },
		{ x: 500, y: 100 },
		{ x: 700, y: 100 },
		{ x: 400, y: 200 },
		{ x: 600, y: 200 },
		{ x: 100, y: 300 },
		{ x: 300, y: 300 },
		{ x: 500, y: 300 },
		{ x: 700, y: 300 },
		{ x: 900, y: 300 },
		{ x: 100, y: 500 },
		{ x: 300, y: 500 },
		{ x: 500, y: 500 },
		{ x: 700, y: 500 },
		{ x: 900, y: 500 }
	];

	const blueCoordinate = [
		{ x: 100, y: 900 },
		{ x: 300, y: 900 },
		{ x: 500, y: 900 },
		{ x: 700, y: 900 },
		{ x: 900, y: 900 },
		{ x: 100, y: 1100 },
		{ x: 300, y: 1100 },
		{ x: 500, y: 1100 },
		{ x: 700, y: 1100 },
		{ x: 900, y: 1100 },
		{ x: 400, y: 1200 },
		{ x: 600, y: 1200 },
		{ x: 300, y: 1300 },
		{ x: 500, y: 1300 },
		{ x: 700, y: 1300 }
	];
</script>

<div class="w-full min-h-screen">
	<div class="max-w-5xl flex mx-auto max-h-screen">
		<svg class="w-full" viewBox="0 0 1000 1400" fill="none" xmlns="http://www.w3.org/2000/svg">
			<Board />
			{#each redCoordinate as pawn}
				<Pawn cx={pawn.x} cy={pawn.y} color="red" />
			{/each}
			{#each blueCoordinate as pawn}
				<Pawn cx={pawn.x} cy={pawn.y} color="blue" />
			{/each}
		</svg>
	</div>
</div>
