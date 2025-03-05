<script lang="ts">
	import LeagueTable from './table-page/LeagueTable.svelte';

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
		display: block;
		width: 100%;
	}

	.page.hidden {
		display: none;
		position: absolute;
		pointer-events: none;
	}
</style>
