<script lang="ts">
	import { Slot } from '$lib/common/enums';
	import { formatTeamStats, editTeamName } from '$lib/common/util';
	import { game, Team } from '$lib/main/game.svelte';
	import { timerManager } from '$lib/main/time.svelte';

	interface Props {
		team: Team;
		slot: Slot;
	}

	function swapTeamInMatch(slot: Slot) {
		game.swapTeamInMatch(slot);
		timerManager.resetTimer();
	}

	const { team, slot }: Props = $props();
	const isSwapButtonDisabled = $derived(game.queue.isEmpty());
</script>

<div class="team">
	<h2>{team.name}</h2>
	<em><span class="stats">{formatTeamStats(team)}</span></em>
	<p class="streak">
		Streak: <span>{team.currentStreak}</span>
	</p>

	<button
		class="edit-team-button match-team-button"
		aria-label="Edit Team"
		onclick={() => editTeamName(game, team.name)}
	>
		<i class="fas fa-pencil-alt"></i>
	</button>

	<button
		disabled={isSwapButtonDisabled}
		class="move-button match-team-button"
		onclick={() => swapTeamInMatch(slot)}
		aria-label="Move Team Into Queue"
	>
		<i class="fas fa-chevron-down"></i>
	</button>
</div>

<style>
	.team {
		text-align: center;
	}

	.team h2 {
		font-size: 0.8rem;
	}

	.team .stats {
		font-size: 0.8rem;
	}

	.match-team-button {
		padding: 5px;
		font-size: 14px;
		width: 34px;
		height: 34px;
	}

	.edit-team-button {
		background-color: #2196f3;
		color: white;
	}

	.move-button {
		background-color: #607d8b;
		color: white;
		padding: 5px 10px;
		font-size: 14px;
	}

	.move-button:disabled {
		background-color: #ccc;
	}

	.streak {
		font-size: 0.8rem;
		color: #666;
		margin: 5px;
	}

	em {
		font-style: italic;
		font-weight: bold;
	}
</style>
