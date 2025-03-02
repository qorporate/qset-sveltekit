import { LOCAL_STORAGE_ITEM_GameState } from '$lib/common/constants';
import { Slot, CurrentState, MatchResult } from '$lib/common/enums';
import { deepCopyTeam } from '$lib/common/util';
import { browser } from '$app/environment';

export class Game {
	slotA = new MatchSlot(Slot.A);
	slotB = new MatchSlot(Slot.B);
	queue = new Queue();
	currentState = $state(CurrentState.WAITING_FOR_TEAMS);
	undoStack: State[] = $state([]);
	redoStack: State[] = $state([]);

	constructor() {
		this.loadGameState();

		// update undo stack after loading game state, to ensure current state
		// is captured correctly
		this.undoStack = [this.captureCurrentState()];
		this.redoStack = [];
	}

	//#region TEAM MANAGEMENT

	addTeam(teamName: string): string | null {
		teamName = teamName.trim().toUpperCase();

		if (!teamName) {
			return 'Please enter a team name';
		}

		if (
			this.queue.items.some((team) => team.name === teamName) ||
			this.slotA.team?.name === teamName ||
			this.slotB.team?.name === teamName
		) {
			return 'This name is already in use. Try another.';
		}

		const newTeam = new Team(teamName);
		this.queue.enqueue(newTeam);

		if (this.slotA.isEmpty() || this.slotB.isEmpty()) {
			this.setupNextMatch();
		}

		this.saveGameState();
		this.updateUndoStack();
		return null; // No error
	}

	editTeamName(oldTeamName: string, newTeamName: string): string | null {
		// Check if new name already exists
		if (
			this.queue.items.some((team) => team.name === newTeamName) ||
			this.slotA.team?.name === newTeamName ||
			this.slotB.team?.name === newTeamName
		) {
			return 'Team name already exists';
		}

		// Update name in queue
		const team = this.queue.items.find((team) => team.name === oldTeamName);
		if (team) {
			team.name = newTeamName;
		}

		// Update name in slots if necessary
		if (this.slotA.team?.name === oldTeamName) {
			this.slotA.team.name = newTeamName;
		}
		if (this.slotB.team?.name === oldTeamName) {
			this.slotB.team.name = newTeamName;
		}

		this.saveGameState();
		this.updateUndoStack();
		return null;
	}

	removeTeam(teamName: string): void {
		if (this.slotA.team?.name === teamName || this.slotB.team?.name === teamName) {
			this.slotA.team = null;
			this.slotB.team = null;

			this.setupNextMatch();
		}

		this.queue.remove(teamName);
		this.saveGameState();
		this.updateUndoStack();
	}

	moveTeamUpInQueue(teamName: string): void {
		this.queue.moveUp(teamName);
		this.saveGameState();
		this.updateUndoStack();
	}

	moveTeamDownInQueue(teamName: string): void {
		this.queue.moveDown(teamName);
		this.saveGameState();
		this.updateUndoStack();
	}

	swapTeamInMatch(slot: Slot) {
		if (this.queue.isEmpty()) {
			console.error('No teams in queue to swap');
			return;
		}

		const teamToSwap = slot === Slot.A ? this.slotA.team : this.slotB.team;
		if (!teamToSwap) {
			console.error(`No team in slot ${slot} to swap`);
			return;
		}

		const newTeam = this.queue.items[0];
		if (!newTeam) {
			throw new Error('Queue is empty');
		}

		if (slot === Slot.A) {
			this.slotA.setTeam(newTeam);
		} else {
			this.slotB.setTeam(newTeam);
		}

		this.queue.items[0] = teamToSwap;
		this.saveGameState();
		this.updateUndoStack();
	}

	//#endregion

	//#region MATCH SETUP

	/**
	 * Why do we set the currentStreak to 0 when adding new teams?
	 * well, when we added the feature to move teams into the queue from a match
	 * we found the streak was maintained.
	 * I chose not to clear the streak in that function, in case the team moved was immediately
	 * put back in the match.
	 * So, whenever a new team enters the match, we make sure to reset the value.
	 */
	setupNextMatch() {
		switch (this.currentState) {
			case CurrentState.WAITING_FOR_TEAMS:
				if (this.queue.size() >= 2) {
					const teamA = getFirstTeamInQueue(this);
					teamA.currentStreak = 0;

					const teamB = getFirstTeamInQueue(this);
					teamB.currentStreak = 0;

					this.slotA.setTeam(teamA);
					this.slotB.setTeam(teamB);
					this.currentState = CurrentState.MATCH_IN_PROGRESS;
				}
				break;

			case CurrentState.WINNER_NEEDS_CHALLENGER:
				if (this.queue.size() >= 1) {
					// Check which slot has the winner
					if (!this.slotA.isEmpty()) {
						// Winner in A, fill B
						const newTeam = getFirstTeamInQueue(this);
						newTeam.currentStreak = 0;
						this.slotB.setTeam(newTeam);
					} else {
						// Winner in B, fill A
						const newTeam = getFirstTeamInQueue(this);
						newTeam.currentStreak = 0;
						this.slotA.setTeam(newTeam);
					}

					this.currentState = CurrentState.MATCH_IN_PROGRESS;
				}
				break;
		}

		function getFirstTeamInQueue(game: Game): Team {
			const team = game.queue.dequeue();
			if (team) {
				return team;
			} else {
				throw new Error('The queue has no teams.');
			}
		}
	}

	handleResult(result: MatchResult) {
		if (this.slotA.isEmpty() || this.slotB.isEmpty()) {
			return;
		}

		switch (result) {
			case MatchResult.Team1:
				team1Wins(this);
				break;
			case MatchResult.Team2:
				team2Wins(this);
				break;
			case MatchResult.Draw:
				teamsDraw(this);
				break;
		}

		this.setupNextMatch();
		this.saveGameState();
		this.updateUndoStack();

		function team1Wins(game: Game) {
			game.slotA.team!.wins++;
			game.slotA.team!.currentStreak++;

			game.slotB.team!.losses++;
			game.slotB.team!.currentStreak = 0;

			if (game.queue.size() > 0) {
				game.queue.enqueue(game.slotB.team!);
				game.slotB.clear();

				game.currentState = CurrentState.WINNER_NEEDS_CHALLENGER;
			}
		}

		function team2Wins(game: Game) {
			game.slotB.team!.wins++;
			game.slotB.team!.currentStreak++;

			game.slotA.team!.losses++;
			game.slotA.team!.currentStreak = 0;

			if (game.queue.size() > 0) {
				game.queue.enqueue(game.slotA.team!);
				game.slotA.clear();

				// winner stays in their slot. no swap.
				game.currentState = CurrentState.WINNER_NEEDS_CHALLENGER;
			}
		}

		function teamsDraw(game: Game) {
			game.slotA.team!.draws++;
			game.slotA.team!.currentStreak = 0;

			game.slotB.team!.draws++;
			game.slotB.team!.currentStreak = 0;

			// the team with less wins goes into the queue first.
			if (game.slotA.team!.wins <= game.slotB.team!.wins) {
				game.queue.enqueue(game.slotA.team!);
				game.queue.enqueue(game.slotB.team!);
			} else {
				game.queue.enqueue(game.slotB.team!);
				game.queue.enqueue(game.slotA.team!);
			}

			game.slotA.clear();
			game.slotB.clear();
			game.currentState = CurrentState.WAITING_FOR_TEAMS;
		}
	}

	//#endregion

	//#region UNDO / REDO

	undo() {
		// the default state doesn't count as an 'undoable' action
		if (this.undoStack.length <= 1) {
			console.log('There are no actions to undo.');
			return;
		}

		// Just move the current state from undo to redo
		const stateToRedo = this.undoStack.pop()!; // We know it exists because of length check
		this.redoStack.push(stateToRedo);

		// Restore the previous state
		const previousState = this.undoStack[this.undoStack.length - 1];
		this.restoreState(previousState);
	}

	redo() {
		if (this.redoStack.length === 0) {
			console.log('There are no actions to redo.');
			return;
		}

		// Move state from redo to undo
		const stateToUndo = this.redoStack.pop()!; // We know it exists because of length check
		this.undoStack.push(stateToUndo);
		this.restoreState(stateToUndo);
	}

	private updateUndoStack() {
		const state = this.captureCurrentState();
		this.undoStack.push(state);
		// when a new action is performed, the redo stack is invalidated
		this.redoStack = [];
	}

	//#endregion

	//#region PERSISTENCE

	loadGameState() {
		if (!browser) {
			console.debug("Initial load is on server side. Local storage isn't accessed yet.");
			return;
		}

		const savedState = localStorage.getItem(LOCAL_STORAGE_ITEM_GameState);
		if (savedState) {
			const state: State = JSON.parse(savedState);

			this.queue.items = state.queueItems.map((item) => item);
			this.slotA.team = state.teamInMatchA ? state.teamInMatchA : null;
			this.slotB.team = state.teamInMatchB ? state.teamInMatchB : null;
			this.currentState = state.currentState;
		}
	}

	saveGameState() {
		const state: State = this.captureCurrentState();
		localStorage.setItem(LOCAL_STORAGE_ITEM_GameState, JSON.stringify(state));
	}

	private restoreState(state: State) {
		this.queue.items = state.queueItems.map((team) => deepCopyTeam(team)!);
		this.slotA.team = deepCopyTeam(state.teamInMatchA);
		this.slotB.team = deepCopyTeam(state.teamInMatchB);
		this.currentState = state.currentState;

		this.saveGameState();
	}

	private captureCurrentState(): State {
		return {
			queueItems: this.queue.items.map((team) => deepCopyTeam(team)!),
			teamInMatchA: deepCopyTeam(this.slotA.team),
			teamInMatchB: deepCopyTeam(this.slotB.team),
			currentState: this.currentState
		};
	}

	//#endregion
}

export class MatchSlot {
	position = $state<Slot>();
	team = $state<Team | null>(null);

	constructor(position: Slot) {
		this.position = position;
	}

	setTeam(team: Team) {
		this.team = team;
	}

	clear() {
		this.team = null;
	}

	isEmpty() {
		return this.team === null;
	}
}

/// ? Used to represent game states for undo/redo
export class State {
	queueItems: Team[] = [];
	teamInMatchA: Team | null = null;
	teamInMatchB: Team | null = null;
	currentState: CurrentState;

	constructor(
		teamsInQueue: Team[],
		teamInMatchA: Team,
		teamInMatchB: Team,
		currentState: CurrentState
	) {
		this.queueItems = teamsInQueue;
		this.teamInMatchA = teamInMatchA;
		this.teamInMatchB = teamInMatchB;
		this.currentState = currentState;
	}
}

export class Team {
	name = $state('');
	wins = $state(0);
	draws = $state(0);
	losses = $state(0);
	currentStreak = $state(0);

	constructor(name: string) {
		this.name = name;
	}
}

export class Queue {
	items = $state<Team[]>([]);

	enqueue(item: Team) {
		this.items.push(item);
	}

	dequeue() {
		return this.items.shift();
	}

	peek() {
		return this.items[0];
	}

	isEmpty() {
		return this.items.length === 0;
	}

	size() {
		return this.items.length;
	}

	remove(teamName: string) {
		this.items = this.items.filter((team) => team.name !== teamName);
	}

	moveUp(teamName: string) {
		const index = this.items.findIndex((team) => team.name === teamName);
		if (index > 0) {
			const temp = this.items[index];
			this.items[index] = this.items[index - 1];
			this.items[index - 1] = temp;
		}
	}

	moveDown(teamName: string) {
		const index = this.items.findIndex((team) => team.name === teamName);
		if (index < this.items.length - 1) {
			const temp = this.items[index];
			this.items[index] = this.items[index + 1];
			this.items[index + 1] = temp;
		}
	}
}
