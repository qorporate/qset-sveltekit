<script lang="ts">
	import { swipeable } from '@react2svelte/swipeable';
	import Nav from '../Nav.svelte';
	import LeagueTable from './LeagueTable.svelte';
	import MatchDisplay from './MatchDisplay.svelte';
	import QueueDisplay from './QueueDisplay.svelte';
	import Reset from './Reset.svelte';
	import TeamManagement from './TeamManagement.svelte';
	import TimeSelector from './TimeSelector.svelte';
	import UndoRedo from './UndoRedo.svelte';
	import { onMount } from 'svelte';

	let pageWrapper: HTMLElement;
	let maxHeight = 0;

	onMount(() => {
		// Count the number of pages
		totalPages = document.querySelectorAll('.page').length;

		// Calculate the max height after initial render
		setTimeout(updateMaxHeight, 100);

		// Update max height on window resize
		window.addEventListener('resize', updateMaxHeight);

		return () => {
			window.removeEventListener('resize', updateMaxHeight);
		};
	});

	function updateMaxHeight() {
		// Make all pages temporarily visible but not in the flow
		const pages = document.querySelectorAll('.page');
		pages.forEach((page) => {
			(page as HTMLElement).style.visibility = 'hidden';
			(page as HTMLElement).style.position = 'absolute';
			(page as HTMLElement).style.display = 'block';
		});

		// Measure each page
		maxHeight = 0;
		pages.forEach((page) => {
			const height = (page as HTMLElement).offsetHeight;
			if (height > maxHeight) {
				maxHeight = height;
			}
		});

		// Reset visibility
		pages.forEach((page) => {
			(page as HTMLElement).style.visibility = '';
			(page as HTMLElement).style.position = '';
			(page as HTMLElement).style.display = '';
		});

		// Apply the max height to the wrapper
		if (pageWrapper && maxHeight > 0) {
			pageWrapper.style.minHeight = `${maxHeight}px`;
		}
	}

	let currentPage = $state(0);
	let totalPages = $state(0);
	let isTransitioning = $state(false);
	let transitionDirection = $state('');

	function goToNextPage() {
		if (currentPage < totalPages - 1 && !isTransitioning) {
			transitionDirection = 'left';
			isTransitioning = true;

			// Start transition animation
			setTimeout(() => {
				currentPage++;
				// End transition animation
				setTimeout(() => {
					isTransitioning = false;
				}, 300);
			}, 10);
		}
	}

	function goToPreviousPage() {
		if (currentPage > 0 && !isTransitioning) {
			transitionDirection = 'right';
			isTransitioning = true;

			// Start transition animation
			setTimeout(() => {
				currentPage--;
				// End transition animation
				setTimeout(() => {
					isTransitioning = false;
				}, 300);
			}, 10);
		}
	}

	function goToPage(pageIndex: number) {
		if (pageIndex >= 0 && pageIndex < totalPages && !isTransitioning) {
			transitionDirection = pageIndex > currentPage ? 'left' : 'right';
			isTransitioning = true;

			// Start transition animation
			setTimeout(() => {
				currentPage = pageIndex;
				// End transition animation
				setTimeout(() => {
					isTransitioning = false;
				}, 300);
			}, 10);
		}
	}
</script>

<!-- svelte-ignore event_directive_deprecated : the 'modern' ones don't work :/ -->
<div
	bind:this={pageWrapper}
	use:swipeable
	on:swipedleft={goToNextPage}
	on:swipedright={goToPreviousPage}
	class="page-wrapper"
>
	<Nav page="home" />

	<div class="navigation-controls">
		<button
			class="nav-arrow left"
			on:click={goToPreviousPage}
			disabled={currentPage === 0 || isTransitioning}
			aria-label="Previous page"
		>
			<i class="fas fa-chevron-left"></i>
		</button>

		<div class="pagination-dots">
			{#each Array(totalPages) as _, i}
				<button
					class="dot {currentPage === i ? 'active' : ''}"
					on:click={() => goToPage(i)}
					aria-label={`Go to page ${i + 1}`}
					aria-current={currentPage === i ? 'page' : undefined}
				></button>
			{/each}
		</div>

		<button
			class="nav-arrow right"
			on:click={goToNextPage}
			disabled={currentPage === totalPages - 1 || isTransitioning}
			aria-label="Next page"
		>
			<i class="fas fa-chevron-right"></i>
		</button>
	</div>

	<!-- Page 1: Main Game View -->
	<div
		class="page {currentPage === 0 ? 'active' : 'hidden'} 
			{isTransitioning && currentPage === 1 && transitionDirection === 'right' ? 'slide-in-right' : ''} 
			{isTransitioning && currentPage === 0 && transitionDirection === 'left' ? 'slide-out-left' : ''}"
	>
		<UndoRedo />
		<MatchDisplay />
		<TimeSelector />
		<QueueDisplay />
		<TeamManagement />
		<Reset />
	</div>

	<!-- Page 2: League Table -->
	<div
		class="page {currentPage === 1 ? 'active' : 'hidden'} 
			{isTransitioning && currentPage === 0 && transitionDirection === 'left' ? 'slide-in-left' : ''} 
			{isTransitioning && currentPage === 1 && transitionDirection === 'right' ? 'slide-out-right' : ''}"
	>
		<LeagueTable />
	</div>
</div>

<style>
	.page-wrapper {
		width: 100%;
		position: relative;
		transition: min-height 0.3s ease;
	}

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

	.slide-out-left {
		animation: slideOutLeft 0.3s forwards;
	}

	.slide-in-right {
		animation: slideInRight 0.3s forwards;
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

	.navigation-controls {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px 0;
		gap: 15px;
		position: relative;
		z-index: 10;
	}

	.nav-arrow {
		background-color: #f0f0f0;
		border: none;
		border-radius: 50%;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: #333;
	}

	.nav-arrow:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.pagination-dots {
		display: flex;
		gap: 8px;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #ddd;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	.dot.active {
		background-color: #4caf50;
	}

	@media (max-width: 768px) {
		.nav-arrow {
			display: none;
		}
	}
</style>
