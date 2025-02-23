<script lang="ts">
	import { MatchResult } from '$lib/common/enums';
	import { Team } from '$lib/main/classes.svelte';
	import { game } from '$lib/main/game.svelte';

	interface Props {
		teamA: Team;
		teamB: Team;
	}

	const { teamA, teamB }: Props = $props();
	const isDrawButtonAvailable = $derived(game.queue.size() > 1);
</script>

<div class="buttons">
	<button class="win left" onclick={() => game.handleResult(MatchResult.Team1)}>
		<span id="left-team-name">{teamA.name} Wins</span>
	</button>
	<button
		class="draw"
		id="draw-button"
		hidden={!isDrawButtonAvailable}
		onclick={() => game.handleResult(MatchResult.Draw)}
	>
		Draw
	</button>
	<button class="win right" onclick={() => game.handleResult(MatchResult.Team2)}>
		<span id="right-team-name">{teamB.name} Wins</span>
	</button>
</div>

<style>
	.buttons {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin: 20px 0;
	}

	.win {
		color: white;
	}

	.left {
		background-color: #4caf50;
	}

	.draw {
		background-color: #ffc107;
	}

	.right {
		background-color: #2196f3;
	}
</style>
