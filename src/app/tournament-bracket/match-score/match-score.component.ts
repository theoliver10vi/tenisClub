import { Component, OnInit, Input, Inject, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MatchService } from "../../services/match-single.service";
import { Match } from '../../models/match-single.model'
import { ScoreDialogComponent } from "../score-dialog/score-dialog.component";

@Component({
  selector: 'app-match-score',
  templateUrl: './match-score.component.html',
  styleUrls: ['./match-score.component.css']
})
export class MatchScoreComponent implements OnInit, OnChanges {
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

  constructor (
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private matchService: MatchService
  ) { }

  openDialog (): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    this.match.round != '1' ? dialogConfig.width = '37rem' : dialogConfig.width = '52rem';
    dialogConfig.height = '22rem';
    dialogConfig.data = this.match;
    let dialogRef = this.dialog.open(ScoreDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data != undefined) {
          this.match.played = true;
          this.openSnackBar('Marcador guardado!', 'Deshacer ↩️');
        }
        else {
          console.log('Dialogo cerrado sin guardar');
        }
      }
    );
  }

  openSnackBar (message: string, action: string) {
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.horizontalPosition = 'right';
    snackBarConfig.verticalPosition = 'top';
    snackBarConfig.panelClass = ['snackBar-m6', 'text-white'];
    snackBarConfig.duration = 3500;
    let snackBarRef = this.snackBar.open(message, action, snackBarConfig);
    snackBarRef.onAction().subscribe(() => {
      this.resetScore();
      // console.log('Deshacer Called!');
      // console.log(this.match);
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.winnerSelected.emit(this.match.winner);
      this.matchService.updateMatch(this.match);
    })
  }

  resetScore () {
    this.match.score.team1.forEach(element => {
      element.points = 0;
      element.tiebreakPoints = 0;
    });
    this.match.score.team2.forEach(element => {
      element.points = 0;
      element.tiebreakPoints = 0;
    });
    this.match.played = false;
    for (let i = 0; i < this.match.winner.length; i++) {
      this.match.winner.pop();
    }
  }

  updateMatch (newMatch) {
    console.log('updateMatch Called!');
    this.match = newMatch;
  }

  ngOnInit () {
  }

  ngOnChanges () {
  }

  inside = false;

  onInside () {
    this.match.played == false && this.match.player.length != 0 ? this.inside = true : this.inside = false;
  }

  onOutside () {
    this.inside = false;
  }

}
