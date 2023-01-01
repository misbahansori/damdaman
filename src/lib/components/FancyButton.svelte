<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<button
	type="button"
	on:click={() => dispatch('click')}
	class="relative inline-flex items-center justify-start px-10 text-center py-3 overflow-hidden font-bold rounded-full group"
>
	<span
		class="absolute top-0 left-0 w-80 h-80 -mt-1 transition-all duration-700 ease-in-out rotate-45 -translate-x-96 -translate-y-24 bg-white opacity-100 group-hover:translate-x-0"
	/>
	<span
		class="relative w-full text-center text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900"
	>
		<slot />
	</span>
	<span class="absolute inset-0 border-2 border-white rounded-full" />
</button>
