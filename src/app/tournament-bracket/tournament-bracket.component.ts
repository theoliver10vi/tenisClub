import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from "../services/tournament.service";
import { Tournament } from '../models/tournament.model'
import { MatchService } from "../services/match-single.service";
import { Match } from '../models/match-single.model'

@Component({
  selector: 'app-tournament-bracket',
  templateUrl: './tournament-bracket.component.html',
  styleUrls: ['./tournament-bracket.component.scss']
})
export class TournamentBracketComponent implements OnInit, OnChanges {
  constructor (
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private matchService: MatchService
  ) { }
  tournament: Tournament = {}

  winners16: string[] = [];
  winners8: string[] = [];
  winners4: string[] = [];
  winners2: string[] = [];

  matches16: Match[] = [];
  matches8: Match[] = [];
  matches4: Match[] = [];
  matches2: Match[] = [];
  matches1: Match[] = [];

  matches: Array<Match> = [
    {
      tournamentId: this.tournament.id,
      player: ['Juan', 'Pepe'],
      winner: [],
      round: '1/8',
      played: false,
      date: '01/01/2020',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
      }
    },
    {
      tournamentId: this.tournament.id,
      player: ['Wuicho', 'Deadpool'],
      winner: [],
      round: '1/8',
      played: false,
      date: '01/01/2020',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
      }
    },
    {
      tournamentId: this.tournament.id,
      player: ['Superman', 'Batman'],
      winner: [],
      round: '1/8',
      played: false,
      date: '01/01/2020',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
      }
    },
    {
      tournamentId: this.tournament.id,
      player: ['Diosito', 'Gomorra'],
      winner: [],
      round: '1/8',
      played: false,
      date: '01/01/2020',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
      }
    },
    {
      tournamentId: this.tournament.id,
      player: ['El pipila', 'Godzilla'],
      winner: [],
      round: '1/8',
      played: false,
      date: '01/01/2020',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
      }
    },
    {
      tournamentId: this.tournament.id,
      player: ['Naruto', 'Goku'],
      winner: [],
      round: '1/8',
      played: false,
      date: '01/01/2020',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
      }
    },
    {
      tournamentId: this.tournament.id,
      player: ['Calamardo', 'Gary'],
      winner: [],
      round: '1/8',
      played: false,
      date: '01/01/2020',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
      }
    },
    {
      tournamentId: this.tournament.id,
      player: ['El bien', 'El mal'],
      winner: [],
      round: '1/8',
      played: false,
      date: '01/01/2020',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
      }
    },
    {
      tournamentId: this.tournament.id,
      player: [],
      winner: [],
      round: '1/4',
      played: false,
      date: '01/01/2020',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
      }
    },
    {
      tournamentId: this.tournament.id,
      player: [],
      winner: [],
      round: '1/4',
      played: false,
      date: '01/01/2020',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
      }
    },
    {
      tournamentId: this.tournament.id,
      player: [],
      winner: [],
      round: '1/4',
      played: false,
      date: '01/01/2020',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
      }
    },
    {
      tournamentId: this.tournament.id,
      player: [],
      winner: [],
      round: '1/4',
      played: false,
      date: '01/01/2020',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
      }
    },
    {
      tournamentId: this.tournament.id,
      player: [],
      winner: [],
      round: '1/2',
      played: false,
      date: '01/01/2020',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
      }
    },
    {
      tournamentId: this.tournament.id,
      player: [],
      winner: [],
      round: '1/2',
      played: false,
      date: '01/01/2020',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
      }
    },
    {
      tournamentId: this.tournament.id,
      player: [],
      winner: [],
      round: '1',
      played: false,
      date: '01/01/2020',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 }
        ],
      }
    },
  ]

  ngOnInit () {
    let tournamentId = this.route.snapshot.params['idTorneoSeleccionado'];
    this.tournamentService.getTournamentFromId(tournamentId).subscribe(tournament => {
      this.tournament = tournament;
      console.log('En suscripción', this.tournament);
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
    });
  }

  ngOnChanges () { }

  inside = false;

  onWinnerSelected (round: number, player: string[]) {
    console.log('Ganador recibido = ', player);
    let eights0Played = false;
    switch (round) {
      case 16: {
        if (this.matches8[0].played || this.matches8[1].played)
          eights0Played = true;

        let eights1Played = false;
        if (this.matches8[2].played || this.matches8[3].played)
          eights1Played = true;

        let eights2Played = false;
        if (this.matches8[4].played || this.matches8[5].played)
          eights2Played = true;

        let eights3Played = false;
        if (this.matches8[6].played || this.matches8[7].played)
          eights3Played = true;
        let eightsPlayed = false;
        if (eights0Played && eights1Played && eights2Played && eights3Played)
          eightsPlayed = true;


        let quartes0Played = false;
        if (this.matches4[0].played || this.matches4[1].played)
          quartes0Played = true;

        let quartes1Played = false;
        if (this.matches4[2].played || this.matches4[3].played)
          quartes1Played = true;

        this.winners16.push(player[0]);
        if (this.winners16.length <= 2) {
          this.matches8[0].player.push(player[0])
        }
        else if (this.winners16.length <= 4) {
          this.matches8[1].player.push(player[0]);
        }
        else if (this.winners16.length <= 6) {
          this.matches8[2].player.push(player[0]);
        }
        else if (this.winners16.length <= 8) {
          this.matches8[3].player.push(player[0]);
        }
        else if (this.winners16.length <= 10) {
          this.matches8[4].player.push(player[0]);
        }
        else if (this.winners16.length <= 12) {
          this.matches8[5].player.push(player[0]);
        }
        else if (this.winners16.length <= 14) {
          this.matches8[6].player.push(player[0]);
        }
        else {
          this.matches8[7].player.push(player[0]);
        }
      }
      case 8: {
        if (this.matches8[0].played || this.matches8[1].played)
          eights0Played = true;

        let eights1Played = false;
        if (this.matches8[2].played || this.matches8[3].played)
          eights1Played = true;

        let eights2Played = false;
        if (this.matches8[4].played || this.matches8[5].played)
          eights2Played = true;

        let eights3Played = false;
        if (this.matches8[6].played || this.matches8[7].played)
          eights3Played = true;
        let eightsPlayed = false;
        if (eights0Played && eights1Played && eights2Played && eights3Played)
          eightsPlayed = true;


        let quartes0Played = false;
        if (this.matches4[0].played || this.matches4[1].played)
          quartes0Played = true;

        let quartes1Played = false;
        if (this.matches4[2].played || this.matches4[3].played)
          quartes1Played = true;

        if (eights0Played || eights1Played || eights2Played || eights3Played) {
          this.winners8.push(player[0]);
          if (this.winners8.length <= 2) {
            this.matches4[0].player.push(player[0])
          }
          else if (this.winners8.length <= 4) {
            this.matches4[1].player.push(player[0]);
          }
          else if (this.winners8.length <= 6) {
            this.matches4[2].player.push(player[0]);
          }
          else {
            this.matches4[3].player.push(player[0]);
          }
        }
        if (this.matches8.length == 0) {
          this.winners8.push(player[0]);
          if (this.winners8.length <= 2) {
            this.matches4[0].player.push(player[0])
          }
          else if (this.winners8.length <= 4) {
            this.matches4[1].player.push(player[0]);
          }
          else if (this.winners8.length <= 6) {
            this.matches4[2].player.push(player[0]);
          }
          else {
            this.matches4[3].player.push(player[0]);
          }
        }
      }
      case 4: {
        console.log('matches4 Jugados')
        this.matches4.forEach(element => {
          console.log(element.player + ' ', element.played);
        });

        if (this.tournament.numberOfPlayers == 8) {
          this.winners4.push(player[0]);
          this.winners4.length <= 2 ? this.matches2[0].player.push(player[0]) : this.matches2[1].player.push(player[0]);
        }


        // if (this.matches4.length > 0) {
        else {
          let eights1Played = false;
          if (this.matches8[2].played || this.matches8[3].played)
            eights1Played = true;

          let eights2Played = false;
          if (this.matches8[4].played || this.matches8[5].played)
            eights2Played = true;

          let eights3Played = false;
          if (this.matches8[6].played || this.matches8[7].played)
            eights3Played = true;
          let eightsPlayed = false;
          if (eights0Played && eights1Played && eights2Played && eights3Played)
            eightsPlayed = true;


          let quartes0Played = false;
          if (this.matches4[0].played || this.matches4[1].played)
            quartes0Played = true;

          let quartes1Played = false;
          if (this.matches4[2].played || this.matches4[3].played)
            quartes1Played = true;

          if (quartes0Played || quartes1Played && eightsPlayed) {
            this.winners4.push(player[0]);
            this.winners4.length <= 2 ? this.matches2[0].player.push(player[0]) : this.matches2[1].player.push(player[0]);
          }
        }
      }
        break;
      case 2: {
        this.winners2.push(player[0]);
        this.matches1[0].player.push(player[0]);
      }
        break;

      default:
        break;
    }
    this.matches16.forEach(match => {
      this.matchService.updateMatch(match);
    })
    this.matches8.forEach(match => {
      this.matchService.updateMatch(match);
    })
    this.matches4.forEach(match => {
      this.matchService.updateMatch(match);
    })
    this.matches2.forEach(match => {
      this.matchService.updateMatch(match);
    })
    this.matches1.forEach(match => {
      this.matchService.updateMatch(match);
    })
  }

  autoRoleMatch () {

  }

  onInside () {
    this.inside = true;
  }

  onOutside () {
    this.inside = false;
  }

}
