export enum CurrentState {
	WAITING_FOR_TEAMS = 'WAITING_FOR_TEAMS',
	MATCH_IN_PROGRESS = 'MATCH_IN_PROGRESS',
	WINNER_NEEDS_CHALLENGER = 'WINNER_NEEDS_CHALLENGER'
}

export enum Slot {
	A = 'A',
	B = 'B'
}

export enum MatchResult {
	Team1 = 'Team1',
	Team2 = 'Team2',
	Draw = 'Draw'
}

export enum GuidePageSection {
	VideoGuide = 'video-guide',
	StepByStep = 'step-by-step'
}
