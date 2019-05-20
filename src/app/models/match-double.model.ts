export interface Match {
	readonly id: string;
	readonly tournamentId: string;
	player: Array<string>;
	winner: Array<string>;
	round: string;
	susspended: boolean;
	score: {
		team1: Array<{ points: number, tiebreakPoints: number }>,
		team2: Array<{ points: number, tiebreakPoints: number }>
	}
}