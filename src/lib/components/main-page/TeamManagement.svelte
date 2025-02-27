<script lang="ts">
	import { showErrorToast } from '$lib/common/my-toasts';
	import { game } from '$lib/main/game.svelte';
	import ActionButton from './ActionButton.svelte';

	let newTeamName = $state('');

	function addTeam(teamName: string) {
		const error = game.addTeam(teamName);
		if (error) {
			showErrorToast(error);
			return;
		}
		newTeamName = ''; // Clear input on success
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		addTeam(newTeamName);
	}
</script>

<div class="team-management">
	<h2>Team Management</h2>
	<form class="team-input" onsubmit={handleSubmit}>
		<input type="text" bind:value={newTeamName} placeholder="Enter team name" />
		<ActionButton
			color="#4caf50"
			icon="fa-plus"
			onClick={() => addTeam(newTeamName)}
			ariaLabel="Add team to game"
		/>
	</form>
</div>

<style>
	.team-management {
		border-top: 1px solid #ddd;
		padding-top: 10px;
	}
	.team-input {
		display: flex;
		gap: 10px;
		margin-bottom: 20px;
	}
	input[type='text'] {
		padding: 8px;
		border: 1px solid #ddd;
		border-radius: 4px;
		flex-grow: 1;
	}
	@media (max-width: 450px) {
		input[type='text'] {
			/* prevent accessibility zoom in on phones */
			font-size: 16px;
		}
	}
</style>
