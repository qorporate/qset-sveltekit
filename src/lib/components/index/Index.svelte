<script lang="ts">
	import { swipeable } from '@react2svelte/swipeable';
	import { onMount } from 'svelte';
	
	import Nav from '../Nav.svelte';
	import PageNavigation from './PageNavigation.svelte';
	import Page from './Page.svelte';
	import MatchDisplay from './game-page/MatchDisplay.svelte';
	import QueueDisplay from './game-page/QueueDisplay.svelte';
	import Reset from './game-page/Reset.svelte';
	import TeamManagement from './game-page/TeamManagement.svelte';
	import TimeSelector from './game-page/TimeSelector.svelte';
	import UndoRedo from './game-page/UndoRedo.svelte';
	import LeagueTable from './table-page/LeagueTable.svelte';

	let pageWrapper: HTMLElement;
	let maxHeight = 0;

	let currentPage = $state(0);
	let totalPages = $state(0);

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
		if (currentPage < totalPages - 1) {
			currentPage++;
		}
	}

	function goToPreviousPage() {
		if (currentPage > 0) {
			currentPage--;
		}
	}

	function goToPage(pageIndex: number) {
		if (pageIndex >= 0 && pageIndex < totalPages) {
			currentPage = pageIndex;
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
	<PageNavigation {currentPage} {totalPages} {goToPage} {goToNextPage} {goToPreviousPage} />

	<Page isActive={currentPage === 0}>
		<UndoRedo />
		<MatchDisplay />
		<TimeSelector />
		<QueueDisplay />
		<TeamManagement />
		<Reset />
	</Page>

	<Page isActive={currentPage === 1}>
		<LeagueTable />
	</Page>
</div>

<style>
	.page-wrapper {
		width: 100%;
		position: relative;
	}
</style>
