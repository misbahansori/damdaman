<script>
	import { createEventDispatcher } from 'svelte';

	export let cx;
	export let cy;
	export let color;

	const dispatch = createEventDispatcher();

	function onClick() {
		dispatch('click', {
			x: cx,
			y: cy,
			color: color
		});
	}
</script>

<circle
	on:click={onClick}
	{cx}
	{cy}
	r="16"
	class="cursor-pointer"
	fill={color === 'red' ? '#FF005C' : '#426AF5'}
	stroke={color === 'red' ? '#FF7BAB' : '#AAC7FF'}
	stroke-width="6"
/>
