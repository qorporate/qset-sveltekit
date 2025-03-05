<script lang="ts">
	import LeagueTable from './LeagueTable.svelte';

	// Props
	let { isActive, isTransitioning, transitionDirection, currentPage } = $props();
</script>

<div
	class="page {isActive ? 'active' : 'hidden'} 
    {isTransitioning && currentPage === 0 && transitionDirection === 'left' ? 'slide-in-left' : ''} 
    {isTransitioning && currentPage === 1 && transitionDirection === 'right'
		? 'slide-out-right'
		: ''}"
>
	<LeagueTable />
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
	.slide-in-left {
		animation: slideInLeft 0.3s forwards;
	}

	.slide-out-right {
		animation: slideOutRight 0.3s forwards;
	}

	@keyframes slideInLeft {
		from {
			transform: translateX(100%);
			visibility: visible;
		}
		to {
			transform: translateX(0);
			visibility: visible;
		}
	}

	@keyframes slideOutRight {
		from {
			transform: translateX(0);
			visibility: visible;
		}
		to {
			transform: translateX(100%);
			visibility: hidden;
		}
	}
</style>
