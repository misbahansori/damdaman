<script lang="ts">
	import { activePawn, turn } from '$lib/store/state';
	import { Color, type Pawn } from '$lib/types/global.type';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { cubicOut, quintOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let pawn: Pawn;

	const dispatch = createEventDispatcher();

	const tweenedX = tweened(pawn.x, { duration: 400, easing: cubicOut });
	const tweenedY = tweened(pawn.y, { duration: 400, easing: cubicOut });
	const tweenedR = tweened(40, { duration: 300, easing: quintOut, delay: 0 });

	$: {
		tweenedX.set(pawn.x);
		tweenedY.set(pawn.y);
		$activePawn.x === pawn.x && $activePawn.y === pawn.y ? tweenedR.set(54) : tweenedR.set(40);
	}

	function onClick() {
		dispatch('click', pawn);
	}
</script>

<circle
	on:click={onClick}
	cx={$tweenedX}
	cy={$tweenedY + 50}
	r={$tweenedR}
	class="pawn select-none outline-none"
	class:selected={$activePawn.x === pawn.x && $activePawn.y === pawn.y}
	class:pointer-event-none={pawn.color !== $turn}
	fill={pawn.color === Color.RED ? '#FF005C' : '#426AF5'}
	stroke={pawn.color === Color.RED ? '#FF7BAB' : '#AAC7FF'}
	stroke-width="12"
	transition:fade={{ duration: 400, easing: cubicOut }}
/>
