import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter, OnChanges, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MatchService } from "../../services/match-single.service";
import { Match } from '../../models/match-single.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-match-score-admin',
  templateUrl: './match-score-admin.component.html',
  styleUrls: ['./match-score-admin.component.css'],
})
export class MatchScoreAdminComponent implements OnInit, OnChanges {
  @ViewChild('playersDialog') playersDialog: TemplateRef<any>;
  @ViewChild('dateDialog') dateDialog: TemplateRef<any>;
  @ViewChild('suspendDialog') suspendDialog: TemplateRef<any>;

  @Output() playersAssigned: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Input() tournamentPlayers: string[] = [];

  @Input() match: Match;

  selectedPlayer: string[] = ['', ''];
  selectedDate = '';
  availablePlayers1: string[];
  availablePlayers2: string[];

  rolledPlayers: string[];

  openedDialogRef: any;

  constructor (
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private matchService: MatchService,

  ) { }

  // playersDialog
  openPlayersDialog (player: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.height = '16.5rem';
    dialogConfig.width = '40rem';
    this.openedDialogRef = this.dialog.open(this.playersDialog, dialogConfig);
    this.openedDialogRef.afterClosed().subscribe(() => {
      if (this.match.date != '')
        this.openSnackBar('Partido rolado!', 'Deshacer ↩️');
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
      this.resetMatchRole();
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.matchService.updateMatch(this.match);
      this.playersAssigned.emit(this.selectedPlayer);
    })
  }

  savePlayersDialog () {
    this.openedDialogRef.close();
    if (this.selectedPlayer[0].includes(' - ')) {
      // this.selectedPlayer.pop();
      // this.selectedPlayer.pop();
      let playersTeam1 = this.selectedPlayer[0].split(" - ", 2);
      let playersTeam2 = this.selectedPlayer[1].split(" - ", 2);
      console.log('Equipo 1', playersTeam1);
      console.log('Equipo 2', playersTeam2);
      this.match.player.push(playersTeam1[0]);
      this.match.player.push(playersTeam1[1]);
      this.match.player.push(playersTeam2[0]);
      this.match.player.push(playersTeam2[1]);
      // this.selectedPlayer.push(playersTeam1[0]);
      // this.selectedPlayer.push(playersTeam1[1]);
      // this.selectedPlayer.push(playersTeam2[0]);
      // this.selectedPlayer.push(playersTeam2[1]);
    }
    else {
      this.match.player.push(this.selectedPlayer[0]);
      this.match.player.push(this.selectedPlayer[1]);
    }
    this.match.date = this.selectedDate;
    this.tournamentPlayers = this.tournamentPlayers.filter(player => player != this.selectedPlayer[0] || player != this.selectedPlayer[1]);
    console.log('Fecha: ', this.selectedDate);
    console.log(this.selectedPlayer);
  }

  closePlayersDialog () {
    console.log(this.selectedPlayer);
    this.selectedPlayer[0] = '';
    this.selectedPlayer[1] = '';
    this.selectedDate = '';
    this.openedDialogRef.close();
  }

  // dateDialog
  openDateDialog () {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.height = '12.5rem';
    dialogConfig.width = '30rem';
    this.openedDialogRef = this.dialog.open(this.dateDialog, dialogConfig);
    this.openedDialogRef.afterClosed().subscribe(
      () => {
        this.matchService.updateMatch(this.match);
      }
    );
  }

  saveDateDialog () {
    this.match.date = this.selectedDate.toString();
    this.openedDialogRef.close();
    this.selectedDate = '';
    this.matchService.updateMatch(this.match);
    console.log('feccha dateDialog = ' + this.match.date);
  }

  closeDateDialog () {
    this.selectedDate = '';
    this.openedDialogRef.close();
  }

  // suspendDialog
  opensuspendDialog () {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.height = '11rem';
    dialogConfig.width = '36rem';
    this.openedDialogRef = this.dialog.open(this.suspendDialog, dialogConfig);
    this.openedDialogRef.afterClosed().subscribe(
      () => {
        this.matchService.updateMatch(this.match);
      }
    );
  }

  savesuspendDialog () {
    this.match.suspended ? this.match.suspended = false : this.match.suspended = true;
    this.openedDialogRef.close();
    this.matchService.updateMatch(this.match);
  }

  closesuspendDialog () {
    this.openedDialogRef.close();
  }

  onUpdateDate (event) {
    let date = (new Date(event.target.value));
    this.selectedDate = date.toLocaleDateString();
    console.log(this.selectedDate);
  }

  onPlayerSelected (event, player: number) {
    // console.log(event.value);
    if (player == 0) {
      this.availablePlayers2 = this.tournamentPlayers.filter(player => player != event.value);
      console.log('Opciones para jugador 2: ' + this.availablePlayers2);
    }
    if (player == 1) {
      this.availablePlayers1 = this.tournamentPlayers.filter(player => player != event.value);
      console.log('Opciones para jugador 1: ' + this.availablePlayers1);
    }
  }

  resetMatchRole () {
    this.selectedPlayer.pop();
    this.selectedPlayer.pop();
    this.match.player.pop();
    this.match.player.pop();
    this.match.date = '';
  }

  ngOnInit () {
    // this.availablePlayers1 = this.tournamentPlayers;
    // this.availablePlayers2 = this.tournamentPlayers;
  }

  ngOnChanges () {
    this.availablePlayers1 = this.tournamentPlayers;
    this.availablePlayers2 = this.tournamentPlayers;
  }

}
