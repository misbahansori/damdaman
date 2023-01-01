<script>
	import { showStartScreen } from '$lib/store/state';
	import FancyButton from './FancyButton.svelte';
</script>

{#if $showStartScreen}
	<div class="fixed inset-0 bg-white z-10 flex items-center justify-center">
		<div class="wood bg-[url(/img/wood-2.jpeg)] absolute inset-0" />

		<div class="max-w-xl mx-auto text-center px-4 z-20 text-white">
			<h1 class="text-4xl font-bold">DAM DAMAN</h1>
			<div class="mt-6 flex flex-col gap-4">
				<FancyButton on:click={() => ($showStartScreen = false)}>Play</FancyButton>
				<FancyButton>Options</FancyButton>
				<FancyButton>Quit</FancyButton>
			</div>
		</div>
	</div>
{/if}
