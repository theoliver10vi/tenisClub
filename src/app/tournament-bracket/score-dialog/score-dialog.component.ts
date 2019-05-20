import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { Match } from '../../models/match-single.model'
import { FormControl, Validators } from '@angular/forms';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
@Component({
  selector: 'app-score-dialog',
  templateUrl: './score-dialog.component.html',
  styleUrls: ['./score-dialog.component.css']
})
export class ScoreDialogComponent implements OnInit {

  @ViewChild('secondDialog') abandonDialog: TemplateRef<any>;

  calculatedWinner = -1;

  abandonDialogRef: any;

  quitReason: string[] = ['Lesión', 'Motivo personal', 'Clima', 'Le dio miedo', 'Por nena', 'Otro'];
  selectedReason: string = '';

  match: Match;

  playerQuited = {
    playerName: '',
    reason: '',
    filled: false,
  }

  constructor (
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ScoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.match = data;
    console.log('Partido cargado en el dialogo =');
    console.log(this.match);
  }

  openAbandonDialog (player: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    // dialogConfig.height = '25rem';
    dialogConfig.width = '20rem';
    this.playerQuited.reason = '';
    this.abandonDialogRef = this.dialog.open(this.abandonDialog, dialogConfig);
    this.abandonDialogRef.afterClosed().subscribe(
      data => {
        // this.playerQuited.playerName = '';
        // this.playerQuited.reason = '';
      }
    );
    player == 1 ? this.playerQuited.playerName = this.match.player[0] : this.playerQuited.playerName = this.match.player[1];
  }

  saveAbandonDialog () {
    if (this.playerQuited.reason != '') {
      this.playerQuited.filled = true;
      this.abandonDialogRef.close();
    }
  }

  closeAbandonDialog () {
    this.abandonDialogRef.close();
  }

  onReasonChange (event: any) {
    this.playerQuited.reason = event.target.value;
  }

  onPointChange (event: any, set: number, team: number) {
    this.calculatedWinner = -1;
    let valueAsNumber = +event.target.value;
    if (valueAsNumber < 0)
      team == 1 ? this.match.score.team1[set].points = 0 : this.match.score.team2[set].points = 0;
    if (valueAsNumber > 7)
      team == 1 ? this.match.score.team1[set].points = 7 : this.match.score.team2[set].points = 7;
    if (valueAsNumber == 7) {
      team == 1 ? this.match.score.team2[set].points = 6 : this.match.score.team1[set].points = 6;
    }
    if (valueAsNumber == 6) {
      if (team == 1 && this.match.score.team2[set].points > 4)
        this.match.score.team2[set].points = valueAsNumber - 2;
      else if (team == 2 && this.match.score.team1[set].points > 4)
        this.match.score.team1[set].points = valueAsNumber - 2;
    }
    // if (valueAsNumber == 4 || valueAsNumber == 5) {
    //   if (team == 1 && this.match.score.team2[set].points == 6)
    //     this.match.score.team1[set].points = 4;
    //   else if (team == 2 && this.match.score.team1[set].points == 6)
    //     this.match.score.team2[set].points = 4;
    // }
    if (team == 1) {
      if (this.match.score.team2[set].points == 7)
        this.match.score.team1[set].points = 6;
    }
    else {
      if (this.match.score.team1[set].points == 7)
        this.match.score.team2[set].points = 6;
    }
    // console.log('team1: ' + this.match.score.team1);
    // console.log('team2: ' + this.match.score.team2);
  }

  onTiebreakPointChange (event: any, set: number, team: number) {
    this.calculatedWinner = -1;
    let valueAsNumber = +event.target.value;
    let team1TiebreakPoints = this.match.score.team1[set].tiebreakPoints;
    let team2TiebreakPoints = this.match.score.team2[set].tiebreakPoints;
    let tiebreakPointsDifference = Math.abs(team1TiebreakPoints - team2TiebreakPoints);
    if (valueAsNumber == 7 && tiebreakPointsDifference < 2)
      team == 1 ? this.match.score.team2[set].tiebreakPoints = 5 : this.match.score.team1[set].tiebreakPoints = 5;
    if (valueAsNumber > 7) {
      if (team == 1)
        this.match.score.team2[set].tiebreakPoints = valueAsNumber - 2;
      else
        this.match.score.team1[set].tiebreakPoints = valueAsNumber - 2;
    }

  }

  tiebreakHasWinner (set: number): boolean {
    let team1TiebreakPoints = this.match.score.team1[set].tiebreakPoints;
    let team2TiebreakPoints = this.match.score.team2[set].tiebreakPoints;
    let tiebreakPointsDifference = Math.abs(team1TiebreakPoints - team2TiebreakPoints);
    if (team1TiebreakPoints >= 7 || team2TiebreakPoints >= 7) {
      if (tiebreakPointsDifference >= 2)
        return team1TiebreakPoints > team2TiebreakPoints || team2TiebreakPoints > team1TiebreakPoints ? true : false;
      else
        return false;
    }
    else
      return false
  }

  tiebreakWinner (set: number): number {
    let team1TiebreakPoints = this.match.score.team1[set].tiebreakPoints;
    let team2TiebreakPoints = this.match.score.team2[set].tiebreakPoints;
    if (team1TiebreakPoints > team2TiebreakPoints)
      return 1;
    else if (team2TiebreakPoints > team1TiebreakPoints)
      return 2;
    else
      return 0;
  }

  hasSixPoints (player: number, set: number): boolean {
    if (player < 1 || player > 2) {
      console.log('hasSixPoints - player out of range');
      return null;
    }
    else {
      if (player == 1)
        return this.match.score.team1[set].points == 6 ? true : false;
      else // player == 2
        return this.match.score.team2[set].points == 6 ? true : false;
    }
  }

  getSetWinner (set: number): number {
    let team1 = this.match.score.team1;
    let team2 = this.match.score.team2;
    if (team1[set].points <= 6 && team2[set].points <= 6) {
      let pointsDifference = Math.abs(team1[set].points - team2[set].points);
      console.log('Diferencia de puntos set[' + set + '] = ' + pointsDifference);
      if ((this.hasSixPoints(1, set) || this.hasSixPoints(2, set)) && pointsDifference >= 2) {
        return team1[set].points > team2[set].points ? 1 : 2;
      }
      else
        return 0; // Empate
    }
    else { // Tiebreak
      if (this.tiebreakHasWinner(set)) {
        if (team1[set].points > team2[set].points && this.tiebreakWinner(set) == 1)
          return 1;
        else if (team2[set].points > team1[set].points && this.tiebreakWinner(set) == 2)
          return 2;
        else
          return 0;
      }
      else
        return 0;
    }
  }

  getTeamWonSets (team: number): number {
    let wonSets = 0;
    if (this.match.round == '1') { // Final
      for (let i = 0; i < 5; i++) {
        if (this.getSetWinner(i) == team)
          wonSets++;
      }
    }
    else { // Otra ronda
      for (let i = 0; i < 3; i++) {
        if (this.getSetWinner(i) == team)
          wonSets++;
      }
    }
    return wonSets;
  }

  getErrorMessage (): string {
    if (this.calculatedWinner == 0 && this.match.round == '1')
      return 'El jugador debe tener al menos 3 sets ganados';
    if (this.calculatedWinner == 0 && this.match.round != '1')
      return 'El jugador debe tener al menos 2 sets ganados';
  }

  calculateWinner (): number {
    let calculatedWinner = 0;
    let winner = this.match.winner;
    let team1WonSets = 0;
    let team2WonSets = 0;
    team1WonSets = this.getTeamWonSets(1);
    team2WonSets = this.getTeamWonSets(2);
    if (team1WonSets == team2WonSets) {
      console.log('Hubo empate');
    }
    else {
      console.log('team1WonSets = ' + team1WonSets);
      console.log('team2WonSets = ' + team2WonSets);
      let teamWithMoreWonSets = 0;
      teamWithMoreWonSets = Math.max(team1WonSets, team2WonSets);
      if (this.match.round == '1' && teamWithMoreWonSets >= 3) {
        team1WonSets > team2WonSets ? calculatedWinner = 1 : calculatedWinner = 2
      }
      else if (this.match.round != '1' && teamWithMoreWonSets >= 2) {
        team1WonSets > team2WonSets ? calculatedWinner = 1 : calculatedWinner = 2
      }
    }
    this.match.winner = winner;
    return calculatedWinner;
  }

  clearScore () {
    this.match.score.team1.forEach(element => {
      element.points = 0;
      element.tiebreakPoints = 0;
    });
    this.match.score.team2.forEach(element => {
      element.points = 0;
      element.tiebreakPoints = 0;
    });
  }

  save () {
    if (this.playerQuited.filled) {
      this.playerQuited.playerName == this.match.player[0] ? this.match.winner.push(this.match.player[1]) : this.match.winner.push(this.match.player[0]);
      this.dialogRef.close(this.match);
    }
    else {
      let winner = this.calculateWinner();
      this.calculatedWinner = winner;
      if (winner != 0) {
        if (this.match.player.length > 2) {
          if (winner == 1) {
            this.match.winner.push(this.match.player[0]);
            this.match.winner.push(this.match.player[1]);
          }
          else {
            this.match.winner.push(this.match.player[2]);
            this.match.winner.push(this.match.player[3]);
          }
        }
        else
          winner == 1 ? this.match.winner.push(this.match.player[0]) : this.match.winner.push(this.match.player[1]);
        this.dialogRef.close(this.match);
      }
    }
  }
  close (): void {
    // this.clearScore();
    this.dialogRef.close();
  }

  onReasonChanged (event) {
    this.playerQuited.filled = true;
    this.playerQuited.reason = event;
    this.selectedReason = event;
    console.log(this.selectedReason);
  }

  ngOnInit () {
  }

}
