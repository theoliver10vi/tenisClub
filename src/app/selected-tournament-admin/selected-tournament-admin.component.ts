import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter
} from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatSnackBar} from "@angular/material";
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Tournament} from "../models/tournament.model";
import {Player} from "../models/player.model";
import {TournamentService} from "../services/tournament.service";
import {PlayerService} from "../services/player.service";

@Component({selector: "app-selected-tournament-admin", templateUrl: "./selected-tournament-admin.component.html", styleUrls: ["./selected-tournament-admin.component.css"]})
export class SelectedTournamentAdminComponent implements OnInit {
  @ViewChild("playersDialog")playersDialog: TemplateRef<any>;
  @ViewChild("playersDialogDouble")playersDialogDouble: TemplateRef<any>;
  playerControl = new FormControl("", [Validators.required]);
  pl1Control = new FormControl("", [Validators.required]);
  pl2Control = new FormControl("", [Validators.required]);
  tournaments: Tournament[];
  selectedTournament: Tournament;
  tournamentId: string;
  players: Player[];
  playersSelect: Player[];
  displayedColumns: string[] = ["name"];
  sourcePlayersTeams: string[];

  checked = false;
  indeterminate = false;
  labelPosition = "after";
  disabled = false;
  openedDialogRef: any;
  availablePlayers1: Player[];
  availablePlayers2: Player[];
  playerT: string;
  playerT2: string;
  imgPlayer: string = null;
  imgPlayer2: string = null;
  double: boolean;

  constructor(private _route : ActivatedRoute, private tournamentService : TournamentService, private dialog : MatDialog, private playerService : PlayerService) {}

  ngOnInit() {
    let nameT = this._route.snapshot.paramMap.get("imageT");
    this.tournamentService.getTournamentSelect(nameT).subscribe(tournaments => {
      this.tournaments = tournaments;
      this.tournamentId = this.tournaments[0].id;
      this.selectedTournament = this.tournaments[0];
      if (this.tournaments[0].modality == "sencillo") {
        this.double = false;
        this.sourcePlayersTeams = this.tournaments[0].enrolledPlayers;
      } else {
        if (this.tournaments[0].modality == "doble") {
          this.double = true;
          this.sourcePlayersTeams = [];
          for (let i = 0; i < this.tournaments[0].enrolledPlayers.length; i = i + 2) {
            let team = this.tournaments[0].enrolledPlayers[i] + " - " + this.tournaments[0].enrolledPlayers[i + 1];
            this.sourcePlayersTeams.push(team);
          }
        }
      }
    });

    this.playerService.getPlayer().subscribe(players => {
      this.players = players;
      if (this.selectedTournament.category == "varonil") {
        this.availablePlayers1 = this.players.filter(player => player.gender == "Masculino");
        this.availablePlayers2 = this.players.filter(player => player.gender == "Masculino");
      } else if (this.selectedTournament.category == "femenil") {
        this.availablePlayers1 = this.players.filter(player => player.gender == "Femenino");
        this.availablePlayers2 = this.players.filter(player => player.gender == "Femenino");
      } else {
        this.availablePlayers1 = this.players.filter(player => player.gender == "Masculino");
        this.availablePlayers2 = this.players.filter(player => player.gender == "Femenino");
      }
      console.log(this.players);
      this.availablePlayers1 = this.availablePlayers1.filter(element => !this.selectedTournament.enrolledPlayers.includes(element.name));
      this.availablePlayers2 = this.availablePlayers2.filter(element => !this.selectedTournament.enrolledPlayers.includes(element.name));
    });
  }

  openPlayersDialog() {
    if (this.double == false) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false;
      dialogConfig.height = "20.5rem";
      dialogConfig.width = "40rem";
      this.openedDialogRef = this.dialog.open(this.playersDialog, dialogConfig);
      this.openedDialogRef.afterClosed().subscribe(data => {});
    } else {
      if (this.double == true) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = false;
        dialogConfig.height = "30.5rem";
        dialogConfig.width = "40rem";
        this.openedDialogRef = this.dialog.open(this.playersDialogDouble, dialogConfig);
        this.openedDialogRef.afterClosed().subscribe(data => {});
      }
    }
  }

  closePlayersDialog() {
    this.openedDialogRef.close();
  }

  onPlayerImage(event) {
    this.playerService.getPlayerSelectName(event.value).subscribe(playersSelect => {
      this.playersSelect = playersSelect;
      this.imgPlayer = this.playersSelect[0].imageP;
      console.log(this.playersSelect[0].imageP);
    });
    console.log("Imagen: " + this.imgPlayer);
  }

  onPlayerImage2(event) {
    this.playerService.getPlayerSelectName(event.value).subscribe(playersSelect => {
      this.playersSelect = playersSelect;
      this.imgPlayer2 = this.playersSelect[0].imageP;
      console.log(this.playersSelect[0].imageP);
    });
    console.log("Imagen: " + this.imgPlayer2);
  }

  onUpdateTournament() {
    if (this.double == false) {
      this.tournaments[0].enrolledPlayers.push(this.playerT);
      this.tournamentService.updateTournament(this.tournaments[0]);
      console.log(this.playerT);
      this.availablePlayers1 = this.availablePlayers1.filter(element => element != this.playerT);
      this.playerT = "";
      this.playerT2 = "";
      this.availablePlayers1 = this.availablePlayers1.filter(element => !this.tournaments[0].enrolledPlayers.includes(element.name));
      this.availablePlayers2 = this.availablePlayers2.filter(element => !this.tournaments[0].enrolledPlayers.includes(element.name));
      this.imgPlayer = null;
      this.imgPlayer2 = null;
      this.dialog.closeAll();
    } else {
      if (this.double == true) {
        this.tournaments[0].enrolledPlayers.push(this.playerT);
        this.tournamentService.updateTournament(this.tournaments[0]);
        this.tournaments[0].enrolledPlayers.push(this.playerT2);
        this.tournamentService.updateTournament(this.tournaments[0]);
        console.log(this.playerT);
        this.availablePlayers1 = this.availablePlayers1.filter(element => !this.tournaments[0].enrolledPlayers.includes(element.name));
        this.availablePlayers2 = this.availablePlayers2.filter(element => !this.tournaments[0].enrolledPlayers.includes(element.name));
        this.playerT = "";
        this.playerT2 = "";
        this.imgPlayer = null;
      this.imgPlayer2 = null;
        this.dialog.closeAll();
      }
    }
  }
}
