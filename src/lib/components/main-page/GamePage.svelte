<script lang="ts">
	import UndoRedo from './UndoRedo.svelte';
	import MatchDisplay from './MatchDisplay.svelte';
	import TimeSelector from './TimeSelector.svelte';
	import QueueDisplay from './QueueDisplay.svelte';
	import TeamManagement from './TeamManagement.svelte';
	import Reset from './Reset.svelte';

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
		visibility: visible;
		opacity: 1;
		width: 100%;
	}

	.page.hidden {
		visibility: hidden;
		opacity: 0;
		position: absolute;
		pointer-events: none;
	}
</style>
