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
		// Count the number of (pages)
		totalPages = document.querySelectorAll('.page').length;
	});

	let currentPage = $state(0);
	let totalPages = $state(0);

	// plan
	// add swipeable event handler
	// when swiped, check what direction, and display the appropriate page
	// by default, display the main game view
	// when swiped right, display the league table

	function goToNextPage() {
		console.log('next');
		if (currentPage < totalPages - 1) {
			currentPage++;
			console.log('currentPage', currentPage);
		}
	}

	function goToPreviousPage() {
		console.log('previous');
		if (currentPage > 0) {
			currentPage--;
			console.log('currentPage', currentPage);
		}
	}
</script>

<!-- svelte-ignore event_directive_deprecated : the 'modern' ones don't work :/ -->
<div use:swipeable on:swipedleft={goToNextPage} on:swipedright={goToPreviousPage}>
	<Nav page="home" />
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
	<div class="page hidden">
		<LeagueTable />
	</div>
</div>

<style>
	.page {
		min-width: 100%;
		flex-shrink: 0;
	}

	.page.hidden {
		display: none;
	}
</style>
