import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Match } from '../models/match-single.model'
import { Tournament } from '../models/tournament.model'
import {MatchService} from '../services/match-single.service';
import { Player } from '../models/player.model';

export interface More {
  value:number;
}

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})

export class ScoresComponent implements OnInit {
  @Output() winnerSelected: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Input() match = <Match>{
    id: '',
    tournamentId: '',
    player: ['Roger Federer', 'Rafael Nadal'],
    winner: ['Roger Federer'],
    round: '1/4',
    played: true,
    date: '01/01/2020',
    suspended: false,
    score: {
      team1: [
        { points: 6, tiebreakPoints: 0 },
        { points: 4, tiebreakPoints: 0 },
        { points: 6, tiebreakPoints: 0 }
      ],
      team2: [
        { points: 4, tiebreakPoints: 0 },
        { points: 6, tiebreakPoints: 0 },
        { points: 4, tiebreakPoints: 0 }
      ],
    }
  }

  

  modalitySelected = 'option1';
  categorySelected = 'option1';

  more2:More={
    value:3
  }

  constructor (private matchService: MatchService ) { }
  
  onClick2(){
    this.more2.value=this.more2.value+3;
  }

  ngOnInit () {

  }
  inside = false;

  onInside () {
    this.match.played == false && this.match.player.length != 0 ? this.inside = true : this.inside = false;
  }

  onOutside () {
    this.inside = false;
  }

}
