import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from "../../services/tournament.service";
import { Tournament } from '../../models/tournament.model'
import { MatchService } from "../../services/match-single.service";
import { Match } from '../../models/match-single.model'
@Component({
  selector: 'app-tournament-bracket-info',
  templateUrl: './tournament-bracket-info.component.html',
  styleUrls: ['./tournament-bracket-info.component.scss']
})
export class TournamentBracketInfoComponent implements OnInit, OnChanges {
  inside = false;

  @Input() tournament: Tournament;
  matches: Array<Match> = []
  matches16: Match[] = [];
  matches8: Match[] = [];
  matches4: Match[] = [];
  matches2: Match[] = [];
  matches1: Match[] = [];

  onInside () {
    this.inside = true;
  }

  onOutside () {
    this.inside = false;
  }
  constructor (
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private matchService: MatchService
  ) { }
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
      });
    }
  }
}
