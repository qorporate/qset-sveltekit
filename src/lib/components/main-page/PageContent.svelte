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

	onMount(() => {
		// Count the number of pages
		totalPages = document.querySelectorAll('.page').length;
	});

	let currentPage = $state(0);
	let totalPages = $state(0);
	let container: HTMLElement;

	// plan
	// add swipeable event handler
	// when swiped, check what direction, and display the appropriate page
	// by default, display the main game view
	// when swiped right, display the league table

	function goToNextPage() {
		console.log('next');
		if (currentPage < totalPages - 1) {
			currentPage++;
		}
	}

	function goToPreviousPage() {
		console.log('previous');
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
	use:swipeable
	on:swipedleft={goToNextPage}
	on:swipedright={goToPreviousPage}
	class="page-container-wrapper"
>
	<Nav page="home" />

	<div class="navigation-controls">
		<button
			class="nav-arrow left"
			on:click={goToPreviousPage}
			disabled={currentPage === 0}
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
			disabled={currentPage === totalPages - 1}
			aria-label="Next page"
		>
			<i class="fas fa-chevron-right"></i>
		</button>
	</div>

	<div
		bind:this={container}
		class="page-container"
		style="transform: translateX(-{currentPage * 100}%)"
	>
		<!-- Page 1: Main Game View -->
		<div class="page">
			<UndoRedo />
			<MatchDisplay />
			<TimeSelector />
			<QueueDisplay />
			<TeamManagement />
			<Reset />
		</div>

		<!-- Page 2: League Table -->
		<div class="page">
			<LeagueTable />
		</div>
	</div>
</div>

<style>
	.page-container-wrapper {
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	.page-container {
		display: flex;
		transition: transform 0.3s ease;
		width: 100%;
		touch-action: pan-y;
	}

	.page {
		min-width: 100%;
		flex-shrink: 0;
	}

	.navigation-controls {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px 0;
		gap: 15px;
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
