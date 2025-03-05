<script lang="ts">
	import { swipeable } from '@react2svelte/swipeable';
	import Nav from '../Nav.svelte';
	import { onMount } from 'svelte';

	import PageNavigation from './PageNavigation.svelte';
	import GamePage from './GamePage.svelte';
	import LeagueTablePage from './LeaguePage.svelte';

	let pageWrapper: HTMLElement;
	let maxHeight = 0;

	let currentPage = $state(0);
	let totalPages = $state(0);
	let isTransitioning = $state(false);
	let transitionDirection = $state('');

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

	<PageNavigation
		{currentPage}
		{totalPages}
		{isTransitioning}
		{goToPage}
		{goToNextPage}
		{goToPreviousPage}
	/>

	<GamePage isActive={currentPage === 0} {isTransitioning} {transitionDirection} {currentPage} />

	<LeagueTablePage
		isActive={currentPage === 1}
		{isTransitioning}
		{transitionDirection}
		{currentPage}
	/>
</div>

<style>
	.page-wrapper {
		width: 100%;
		position: relative;
		transition: min-height 0.3s ease;
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
</style>
