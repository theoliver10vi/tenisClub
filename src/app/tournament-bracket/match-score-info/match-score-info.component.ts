import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatSnackBar } from '@angular/material';
import { MatchService } from "../../services/match-single.service";
import { Match } from '../../models/match-single.model'
import { ScoreDialogComponent } from "../score-dialog/score-dialog.component";

@Component({
  selector: 'app-match-score-info',
  templateUrl: './match-score-info.component.html',
  styleUrls: ['./match-score-info.component.css']
})
export class MatchScoreInfoComponent implements OnInit, OnChanges {
  inside = false;

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

  onInside () {
    this.inside = true;
  }

  onOutside () {
    this.inside = false;
  }
  constructor () { }

  ngOnInit () {
  }

  ngOnChanges () { }
}
