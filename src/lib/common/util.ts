import type { Game, Team } from '$lib/main/game.svelte';
import { showErrorToast } from './my-toasts';

export function editTeamName(game: Game, oldTeamName: string): void {
	console.debug('User is trying to edit the team name.');
	const newTeamName = prompt('Enter new team name:');

	// Check if the prompt was cancelled
	if (newTeamName === null) {
		console.debug('User cancelled the edit. Alright, maybe next time.');
		return;
	}

	// Trim and convert to uppercase
	const trimmedNewTeamName = newTeamName.trim().toUpperCase();

	// Check if the new name is the same as the old name or if it's empty
	if (trimmedNewTeamName === oldTeamName.toUpperCase()) {
		showErrorToast('The new name is the same as the old name.');
		return;
	} else if (trimmedNewTeamName === '') {
		showErrorToast('Please provide a name.');
		return;
	}

	// Attempt to edit the team name
	const error = game.editTeamName(oldTeamName, trimmedNewTeamName);
	if (error) {
		showErrorToast(error);
		return;
	}

	console.debug(
		`Team name updated. Old team name: ${oldTeamName}. New team name: ${trimmedNewTeamName}.`
	);
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

/// todo: perhaps specify how many characters we wish to start truncating at
/// as an optional parameter?
export function truncate(name: string): string {
	if (name.length > 5) {
		return name.slice(0, 5) + '...';
	}

	return name;
}
