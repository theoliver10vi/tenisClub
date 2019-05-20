import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { TournamentRegistrationComponent } from './tournament-registration/tournament-registration.component';
import { PlayerRegistrationComponent } from './player-registration/player-registration.component';
import { Tournament } from '../models/tournament.model';
import { TournamentService } from '../services/tournament.service';
import { Player } from '../models/player.model';
import { PlayerService } from '../services/player.service';

export interface More {
  value:number;
}
export interface Cat {
  value: string;
  viewValue: string;
}

export interface Gen {
  value: string;
  viewValue: string;
}

export interface Mod {
  value: string;
  viewValue: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-tournament-management',
  templateUrl: './tournament-management.component.html',
  styleUrls: ['./tournament-management.component.css']
})
export class TournamentManagementComponent implements OnInit {
tournaments: Tournament[];
players: Player[];
tournamentsFilter: Tournament[] = [];
tamFilter: number = 0;

cat: string = "todas";
mod: string = "todas";
gen: string = "todas";

playersFilter: Player[];
tamFilterPlayer: number = 0;

more:More={
  value:3
}


more2:More={
  value:3
}
  constructor(public dialog: MatDialog, private tournamentService: TournamentService, private playerService: PlayerService) { }
  
  onClick(){
    this.more.value=this.more.value+3;
  }

  onClick2(){
    this.more2.value=this.more2.value+3;
  }
  
  onCreateTournament(){
    const dialogConfig1= new MatDialogConfig();
    dialogConfig1.disableClose=false;
    dialogConfig1.width="40%";
    this.dialog.open(TournamentRegistrationComponent,dialogConfig1 );
  }

  onCreatePlayer(){
    const dialogConfig2= new MatDialogConfig();
    dialogConfig2.disableClose=false;
    dialogConfig2.width="40%";
    this.dialog.open(PlayerRegistrationComponent,dialogConfig2 );
  }

  closeDialog() : void {
    const dialogRef = this.dialog.closeAll();
  }

  ngOnInit() {
    this.tournamentService.getTournament().subscribe(tournaments => {
      this.tournaments = tournaments;
      if(this.mod == "todas" && this.cat == "todas"){
      this.tournamentsFilter = tournaments;
      }
      console.log(this.tournaments);
    });

    this.playerService.getPlayer().subscribe(players => {
      this.players = players;
      if(this.gen == "todas"){
        this.playersFilter = players;
        }
      console.log(this.players);
    });
  }

  onFilter()
  {
  //  console.log("modalidad: "+this.mod)
  this.tournamentsFilter = [];
  this.tamFilter = 0;
  if(this.mod != "todas" && this.cat != "todas"){
    for(let i = 0; i<this.tournaments.length; i++)
    {
      if(this.tournaments[i].modality == this.mod && this.tournaments[i].category == this.cat)
      {
        this.tournamentsFilter[this.tamFilter] = this.tournaments[i];
        this.tamFilter++;
        console.log(this.tournamentsFilter[0]);
      }
    }
  }

  if(this.mod == "todas"){
    for(let i = 0; i<this.tournaments.length; i++)
    {
      if(this.tournaments[i].category == this.cat)
      {
        this.tournamentsFilter[this.tamFilter] = this.tournaments[i];
        this.tamFilter++;
        console.log(this.tournamentsFilter[0]);
      }
    }
  }

  if(this.cat == "todas"){
    for(let i = 0; i<this.tournaments.length; i++)
    {
      if(this.tournaments[i].modality == this.mod)
      {
        this.tournamentsFilter[this.tamFilter] = this.tournaments[i];
        this.tamFilter++;
        console.log(this.tournamentsFilter[0]);
      }
    }
  }

  if(this.mod == "todas" && this.cat == "todas"){
    this.tournamentsFilter = this.tournaments;
  }
  }

  onFilterPlayer()
  {
  //  console.log("modalidad: "+this.mod)
  this.playersFilter = [];
  this.tamFilterPlayer = 0;
  if(this.gen != "todas"){
    for(let i = 0; i<this.players.length; i++)
    {
      if(this.players[i].gender == this.gen)
      {
        this.playersFilter[this.tamFilterPlayer] = this.players[i];
        this.tamFilterPlayer++;
        console.log(this.playersFilter[0]);
      }
    }
  }

  if(this.gen == "todas"){
    this.playersFilter = this.players;
  }
  }

}

 
