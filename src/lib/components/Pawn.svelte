<script>
	export let cx;
	export let cy;
	export let color;
</script>

<circle
	{cx}
	{cy}
	r="16"
	class="cursor-pointer"
	fill={color === 'red' ? '#FF005C' : '#426AF5'}
	stroke={color === 'red' ? '#FF7BAB' : '#AAC7FF'}
	stroke-width="6"
/>
