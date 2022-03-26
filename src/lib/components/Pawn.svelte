<script lang="ts">
	import { activePawn } from '$lib/store/state';

	import { Color, type Pawn } from '$lib/types/coordinate.type';

	import { createEventDispatcher } from 'svelte';

	export let cx: number;
	export let cy: number;
	export let color: string;

	const dispatch = createEventDispatcher();

	function onClick() {
		dispatch('click', <Pawn>{
			x: cx,
			y: cy,
			color: color,
		});
	}
</script>

<circle
	on:click={onClick}
	{cx}
	{cy}
	r={$activePawn.x === cx && $activePawn.y === cy ? 40 : 28}
	class="pawn"
	class:selected={$activePawn.x === cx && $activePawn.y === cy}
	fill={color === Color.RED ? '#FF005C' : '#426AF5'}
	stroke={color === Color.RED ? '#FF7BAB' : '#AAC7FF'}
	stroke-width="6"
/>

<style>
	.pawn {
		cursor: pointer;
		transition: all 500ms cubic-bezier(0.13, 0.67, 0.34, 0.93);
	}
	.pawn.selected {
		transition: all 150ms cubic-bezier(0.13, 0.67, 0.34, 0.93);
	}
</style>
