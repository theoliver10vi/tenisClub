import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from "../services/tournament.service";
import { Tournament } from '../models/tournament.model'
import { Match } from '../models/match-single.model'
import { MatchService } from "../services/match-single.service";
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-tournament-bracket-admin',
  templateUrl: './tournament-bracket-admin.component.html',
  styleUrls: ['./tournament-bracket-admin.component.scss']
})
export class TournamentBracketAdminComponent implements OnInit, OnChanges {

  constructor (
    private route: ActivatedRoute,
    private matchService: MatchService,
    private tournamentService: TournamentService
  ) { }
  // @Input() tournamentId: string;

  @Input() tournament: Tournament;

  availablePlayers = [];

  matches16: Match[];
  matches8: Match[];
  matches4: Match[];
  matches2: Match[];
  matches1: Match[];
  matches: Match[];

  getAvailablePlayers (): string[] {
    return this.availablePlayers;
  }

  onPlayersAssigned (selectedPlayers: string[]) {
    console.log('Se escucho el evento: assignedPlayers');
    console.log(selectedPlayers);
    selectedPlayers.forEach(element => {
      this.availablePlayers = this.availablePlayers.filter(word => word != element);
    });
    console.log(this.availablePlayers);
  }

  addMatchesToFirebase () {
    this.matchService.addTournamentMatches(this.tournament);
  }

  ngOnInit () {

  }

  ngOnChanges () {
    if (this.tournament != undefined) {
      this.matchService.getMatchesFromTournament(this.tournament).subscribe(matches => {
        this.matches = matches;
        // console.log('Partidos del torneo: ' + this.tournament.name, this.matches);
        this.matches16 = this.matches.filter(element => element.round == '1/16');
        this.matches8 = this.matches.filter(element => element.round == '1/8');
        this.matches4 = this.matches.filter(element => element.round == '1/4');
        this.matches2 = this.matches.filter(element => element.round == '1/2');
        this.matches1 = this.matches.filter(element => element.round == '1');
        console.log('Partidos 16' + this.tournament.name, this.matches16);
        console.log('Partidos 8' + this.tournament.name, this.matches8);
        console.log('Partidos 4' + this.tournament.name, this.matches4);
        console.log('Partidos 2' + this.tournament.name, this.matches2);

        if (this.tournament.modality == 'sencillo') {
          let rolledPlayers: string[] = [];
          this.matches.forEach(match => {
            match.player.forEach(rolledPlayer => {
              rolledPlayers.push(rolledPlayer);
            })
          })
          this.availablePlayers = this.tournament.enrolledPlayers;
          this.availablePlayers = this.availablePlayers.filter(element => !rolledPlayers.includes(element));
        }
        else {
          for (let i = 0; i < this.tournament.enrolledPlayers.length; i = i + 2) {
            let team = this.tournament.enrolledPlayers[i] + ' - ' + this.tournament.enrolledPlayers[i + 1]
            this.availablePlayers.push(team);
          }
          console.log('Equipos inscritos', this.availablePlayers);
          let rolledTeams: string[] = [];
          this.matches.forEach(match => {
            if (match.player.length > 2) {
              rolledTeams.push(match.player[0] + ' - ' + match.player[1]);
              rolledTeams.push(match.player[2] + ' - ' + match.player[3]);
            }
          })
          console.log('Equipos rolados', rolledTeams);
          this.availablePlayers = this.availablePlayers.filter(element => !rolledTeams.includes(element));
          console.log('Equipos pendientes', this.availablePlayers);
        }
      });
    }
  }

}
