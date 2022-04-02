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
	r="40"
	class="cursor-pointer highlight-none"
	fill={$activePawn.color === Color.RED ? '#FF9CC0' : '#A8BBFF'}
	stroke={$activePawn.color === Color.RED ? '#FFCEE0' : '#D0E0FF'}
	stroke-width="12"
	transition:fade={{ duration: 150 }}
/>

<style>
	.highlight-none {
		-webkit-tap-highlight-color: transparent;
	}
</style>
