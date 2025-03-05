<script lang="ts">
	import UndoRedo from './game-page/UndoRedo.svelte';
	import MatchDisplay from './game-page/MatchDisplay.svelte';
	import TimeSelector from './game-page/TimeSelector.svelte';
	import QueueDisplay from './game-page/QueueDisplay.svelte';
	import TeamManagement from './game-page/TeamManagement.svelte';
	import Reset from './game-page/Reset.svelte';

	// Props
	let { isActive } = $props();
</script>

<div class="page {isActive ? 'active' : 'hidden'} ">
	<UndoRedo />
	<MatchDisplay />
	<TimeSelector />
	<QueueDisplay />
	<TeamManagement />
	<Reset />
</div>

<style>
	.page {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.page.active {
		position: relative;
		display: block;
		width: 100%;
	}

	.page.hidden {
		display: none;
		position: absolute;
		pointer-events: none;
	}
</style>
