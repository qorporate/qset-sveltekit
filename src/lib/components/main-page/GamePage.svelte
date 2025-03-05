<script lang="ts">
	import UndoRedo from './UndoRedo.svelte';
	import MatchDisplay from './MatchDisplay.svelte';
	import TimeSelector from './TimeSelector.svelte';
	import QueueDisplay from './QueueDisplay.svelte';
	import TeamManagement from './TeamManagement.svelte';
	import Reset from './Reset.svelte';

	// Props
	let { isActive, isTransitioning, transitionDirection, currentPage } = $props();
</script>

<div
	class="page {isActive ? 'active' : 'hidden'} 
    {isTransitioning && currentPage === 1 && transitionDirection === 'right'
		? 'slide-in-right'
		: ''} 
    {isTransitioning && currentPage === 0 && transitionDirection === 'left'
		? 'slide-out-left'
		: ''}"
>
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

	/* Transition animations */
	.slide-in-right {
		animation: slideInRight 0.3s forwards;
	}

	.slide-out-left {
		animation: slideOutLeft 0.3s forwards;
	}

	@keyframes slideInRight {
		from {
			transform: translateX(-100%);
			visibility: visible;
		}
		to {
			transform: translateX(0);
			visibility: visible;
		}
	}

	@keyframes slideOutLeft {
		from {
			transform: translateX(0);
			visibility: visible;
		}
		to {
			transform: translateX(-100%);
			visibility: hidden;
		}
	}
</style>
