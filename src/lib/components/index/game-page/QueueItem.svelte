<script lang="ts">
	import { editTeamName } from '$lib/common/util';
	import { game, Team } from '$lib/main/game.svelte';
	import ActionButton from './ActionButton.svelte';

	interface Props {
		team: Team;
		index: number;
		totalItems: number;
	}

	const { team, index, totalItems }: Props = $props();
</script>

<div class="queue-item {index === 0 ? 'next-up' : ''}">
	<span class="team-info">
		<b>{team.name}</b>
	</span>

	<div class="queue-item-buttons">
		<ActionButton
			color="#607d8b"
			disabled={index === 0}
			ariaLabel="Move {team.name} up"
			icon="fa-chevron-up"
			onClick={() => game.moveTeamUpInQueue(team.name)}
		/>
		<ActionButton
			color="#607d8b"
			disabled={index === totalItems - 1}
			ariaLabel="Move {team.name} down"
			icon="fa-chevron-down"
			onClick={() => game.moveTeamDownInQueue(team.name)}
		/>
		<ActionButton
			color="#2196f3"
			ariaLabel="Edit {team.name}"
			icon="fa-pencil-alt"
			onClick={() => editTeamName(game, team.name)}
		/>
		<ActionButton
			color="#f44336"
			ariaLabel="Remove {team.name}"
			icon="fa-trash-alt"
			onClick={() => game.removeTeam(team.name)}
		/>
	</div>
</div>

<style>
	.queue-item {
		padding: 10px;
		margin: 5px 0;
		background-color: #f8f8f8;
		border-radius: 4px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.queue-item-buttons {
		display: flex;
		gap: 5px;
	}

	.team-info {
		font-size: 0.95rem;
	}

	/* Highlight the first team in the queue */
	.next-up {
		background-color: #dff0d8; /* Light green background */
		border: 2px solid #4caf50; /* Green border */
		font-weight: bold;
		box-shadow: 0 0 5px #4caf50; /* Subtle glow effect */
		animation: pulse 1.5s infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
			box-shadow: 0 0 5px #4caf50;
		}
		50% {
			transform: scale(1.02);
			box-shadow: 0 0 10px #4caf50;
		}
		100% {
			transform: scale(1);
			box-shadow: 0 0 5px #4caf50;
		}
	}
</style>
