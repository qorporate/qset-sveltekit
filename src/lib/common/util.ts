import type { Game, Team } from '$lib/main/classes.svelte';
import { showErrorToast } from './my-toasts';

export function editTeamName(game: Game, oldTeamName: string): void {
	const newTeamName = prompt('Enter new team name:', oldTeamName)?.trim().toUpperCase();

	if (!newTeamName || newTeamName === oldTeamName) {
		const errorMessage = newTeamName
			? 'The new name is the same as the old name.'
			: 'Please provide a name.';
		showErrorToast(errorMessage);
		return;
	}

	const error = game.editTeamName(oldTeamName, newTeamName);
	if (error) {
		showErrorToast(error);
	}
}

export function formatTeamStats(team: Team): string {
	return `${team.wins}W | ${team.draws}D | ${team.losses}L`;
}

export function deepCopyTeam(team: Team | null): Team | null {
	if (!team) {
		return null;
	}
	return {
		name: team.name,
		wins: team.wins,
		losses: team.losses,
		draws: team.draws,
		currentStreak: team.currentStreak
	};
}
