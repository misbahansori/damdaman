<script lang="ts">
	import { activePawn } from '$lib/store/state';
	import { fade } from 'svelte/transition';
	import { Color, type Coordinate } from '$lib/types/global.type';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let coordinate: Coordinate;
</script>

<circle
	on:click={() => dispatch('click', coordinate)}
	cx={coordinate.x}
	cy={coordinate.y}
	fill="#000"
	opacity="0"
	r="64"
	class="cursor-pointer highlight-none"
/>

<circle
	cx={coordinate.x}
	cy={coordinate.y}
	r="40"
	class="cursor-pointer highlight-none pointer-events-none fill-current 
	{$activePawn.color === Color.RED ? 'text-red-400' : 'text-blue-400'}"
	stroke="#fff"
	opacity="0.7"
	stroke-width="12"
	transition:fade={{ duration: 150 }}
/>

<style>
	.highlight-none {
		-webkit-tap-highlight-color: transparent;
	}
</style>
