<script lang="ts">
	import { MatchResult } from '$lib/common/enums';
	import { Team } from '$lib/main/classes.svelte';
	import { game } from '$lib/main/game.svelte';
	import { timerManager } from '$lib/main/time.svelte';

	interface Props {
		teamA: Team;
		teamB: Team;
	}

	function handleResult(result: MatchResult) {
		game.handleResult(result);
		timerManager.resetTimer();
	}

	const { teamA, teamB }: Props = $props();
	const isDrawButtonAvailable = $derived(game.queue.size() > 1);
</script>

<div class="buttons">
	<button class="win left" onclick={() => handleResult(MatchResult.Team1)}>
		<span id="left-team-name">{teamA.name} Wins</span>
	</button>
	<button
		class="draw"
		id="draw-button"
		hidden={!isDrawButtonAvailable}
		onclick={() => handleResult(MatchResult.Draw)}
	>
		Draw
	</button>
	<button class="win right" onclick={() => handleResult(MatchResult.Team2)}>
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
