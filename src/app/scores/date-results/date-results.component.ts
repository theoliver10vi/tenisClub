import { Component, OnInit,Input } from '@angular/core';
import { Match } from '../../models/match-single.model'

@Component({
  selector: 'app-date-results',
  templateUrl: './date-results.component.html',
  styleUrls: ['./date-results.component.css']
})
export class DateResultsComponent implements OnInit {

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



  defaultElevation = 2;
  raisedElevation = 8;
  borderColor = '';
  constructor () {
    this.borderColor = '';
  }

  getColor () {
    return this.borderColor === '' ? 'orange' : 'blue';
  }

  ngOnInit () {
  }
}
