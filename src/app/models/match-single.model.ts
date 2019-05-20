export interface Match {
	id?: string;
	readonly tournamentId?: string;
	tournamentName?: string;
	player: Array<string>;
	winner: Array<string>;
	round: string;
	firstRound?: boolean;
	played: boolean;
	date: string;
	suspended: boolean;
	score: {
		team1: Array<{ points: number, tiebreakPoints: number }>,
		team2: Array<{ points: number, tiebreakPoints: number }>
	}
}