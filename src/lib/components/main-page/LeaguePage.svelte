<script lang="ts">
	import LeagueTable from './LeagueTable.svelte';

	// Props
	let { isActive } = $props();
</script>

<div class="page {isActive ? 'active' : 'hidden'} ">
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
</style>
