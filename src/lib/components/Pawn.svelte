<script lang="ts">
	import { activePawn, turn } from '$lib/store/state';
	import { Color, type Pawn } from '$lib/types/global.type';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let pawn: Pawn;

	const dispatch = createEventDispatcher();

	function onClick() {
		dispatch('click', pawn);
	}
</script>

<circle
	on:click={onClick}
	cx={pawn.x}
	cy={pawn.y + 50}
	r={$activePawn.x === pawn.x && $activePawn.y === pawn.y ? 54 : 40}
	class="pawn select-none outline-none"
	class:selected={$activePawn.x === pawn.x && $activePawn.y === pawn.y}
	class:pointer-event-none={pawn.color !== $turn}
	fill={pawn.color === Color.RED ? '#FF005C' : '#426AF5'}
	stroke={pawn.color === Color.RED ? '#FF7BAB' : '#AAC7FF'}
	stroke-width="12"
	transition:fade={{ duration: 500, easing: quintOut }}
/>

<style>
	.pawn {
		cursor: pointer;
		transition: all 500ms cubic-bezier(0.13, 0.67, 0.34, 0.93);
		transform-origin: initial;
	}
	.pawn.selected {
		transition: all 150ms cubic-bezier(0.13, 0.67, 0.34, 0.93);
	}
</style>
