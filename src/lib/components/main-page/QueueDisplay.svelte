<script lang="ts">
	import { game } from '$lib/main/game.svelte';
	import QueueItem from './QueueItem.svelte';

	const teams = $derived(game.queue.items);
</script>

<div>
	<h2>
		Queue
		<span class="waiting-count">({teams.length} teams)</span>
	</h2>
	<ul class="queue-list">
		{#each teams as team, index}
			<li>
				<QueueItem {team} {index} totalItems={teams.length} />
			</li>
		{/each}
	</ul>
</div>

<style>
	.waiting-count {
		font-size: 14px;
		color: #666;
		margin-left: 10px;
	}

	.queue-list {
		list-style: none;
		padding: 0;
	}
</style>
