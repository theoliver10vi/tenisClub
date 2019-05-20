export interface Tournament {
	id?: string;
	name?: string;
	modality?: string;
	category?: string;
	announcementStatus?: string;
	tournamentStatus?: string;
	beginDate?: string;
	endDate?: string;
	numberOfPlayers?: any;
	enrolledPlayers?: Array<string>;
	playedRounds?: Array<boolean>;
	imageT?: string;
}