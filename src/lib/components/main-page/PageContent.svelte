<script lang="ts">
	import Nav from '../Nav.svelte';
	import LeagueTable from './LeagueTable.svelte';
	import MatchDisplay from './MatchDisplay.svelte';
	import QueueDisplay from './QueueDisplay.svelte';
	import Reset from './Reset.svelte';
	import SwipeableContainer from './SwipeableContainer.svelte';
	import TeamManagement from './TeamManagement.svelte';
	import TimeSelector from './TimeSelector.svelte';
	import UndoRedo from './UndoRedo.svelte';
</script>

<Nav page="home" />
<SwipeableContainer>
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
</SwipeableContainer>

<style>
	.page {
		min-width: 100%;
		flex-shrink: 0;
	}
</style>
