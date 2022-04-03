<script lang="ts">
	import { dam, turn } from '$lib/store/state';
	import { Color, type Pawn } from '$lib/types/global.type';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { cubicOut, quintOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let pawn: Pawn;
	export let isActive: boolean = false;

	const dispatch = createEventDispatcher();

	const tweenedX = tweened(pawn.x, { duration: 400, easing: cubicOut });
	const tweenedY = tweened(pawn.y, { duration: 400, easing: cubicOut });
	const tweenedR = tweened(40, { duration: 300, easing: quintOut, delay: 0 });

	$: {
		tweenedX.set(pawn.x);
		tweenedY.set(pawn.y);
		isActive ? tweenedR.set(54) : tweenedR.set(40);
	}

	function onClick() {
		if ($dam.color === pawn.color) {
			dispatch('removePawn', pawn);
			return;
		}
		dispatch('click', pawn);
	}
</script>

<circle
	on:click={onClick}
	cx={pawn.x}
	cy={pawn.y}
	fill="#000"
	opacity="0"
	r="64"
	class="cursor-pointer highlight-none"
/>

<circle
	cx={$tweenedX}
	cy={$tweenedY}
	r={$tweenedR}
	class="pointer-events-none fill-current {pawn.color === Color.RED ? 'text-red-500' : 'text-blue-600'}"
	class:pointer-event-none={pawn.color !== $turn}
	fill={pawn.color === Color.RED ? '#FF005C' : '#426AF5'}
	stroke="#fff"
	stroke-width="12"
	transition:fade={{ duration: 400, easing: cubicOut }}
/>

<style>
	.highlight-none {
		-webkit-tap-highlight-color: transparent;
	}
</style>
