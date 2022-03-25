<script lang="ts">
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
	r="16"
	class="cursor-pointer"
	fill={color === Color.RED ? '#FF005C' : '#426AF5'}
	stroke={color === Color.RED ? '#FF7BAB' : '#AAC7FF'}
	stroke-width="6"
/>
