import { Component, OnInit, Inject } from '@angular/core';
import { Tournament } from '../models/tournament.model';
import { TournamentService } from '../services/tournament.service';

import { Player } from '../models/player.model';
import { PlayerService } from '../services/player.service';

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

export interface More {
  value: number;
}
@Component({
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})


export class TorneosComponent implements OnInit {

  tournaments: Tournament[];
  tournamentsFilter: Tournament[] = [];
  tamFilter: number = 0;

  cat: string = "todas";
  mod: string = "todas";
  gen: string = "todas";

  players: Player[];
  playersFilter: Player[];
  tamFilterPlayer: number = 0;

  cats: Cat[] = [
    { value: 'varonil-0', viewValue: 'Varonil' },
    { value: 'femenil-1', viewValue: 'Femenil' },
    { value: 'mixto-2', viewValue: 'Mixto' }
  ];

  mods: Mod[] = [
    { value: 'sencillos-0', viewValue: 'Sencillos' },
    { value: 'dobles-1', viewValue: 'Dobles' }
  ];

  gens: Gen[] = [
    { value: 'femenino-0', viewValue: 'Femenino' },
    { value: 'masculino-1', viewValue: 'Masculino' }
  ];

  more: More = {
    value: 3
  }

  more2: More = {
    value: 3
  }

  constructor (
    private tournamentService: TournamentService,
    private playerService: PlayerService,
  ) { }

  onClick () {
    this.more.value = this.more.value + 3;
  }

  onClick2 () {
    this.more2.value = this.more2.value + 3;
  }

  ngOnInit () {
    this.tournamentService.getTournament().subscribe(tournaments => {
      this.tournaments = tournaments;
      if (this.mod == "todas" && this.cat == "todas") {
        this.tournamentsFilter = tournaments;
      }
      console.log(this.tournaments);
    });

    this.playerService.getPlayer().subscribe(players => {
      this.players = players;
      if (this.gen == "todas") {
        this.playersFilter = players;
      }
      console.log(this.players);
    });
  }

  onFilter () {
    //  console.log("modalidad: "+this.mod)
    this.tournamentsFilter = [];
    this.tamFilter = 0;
    if (this.mod != "todas" && this.cat != "todas") {
      for (let i = 0; i < this.tournaments.length; i++) {
        if (this.tournaments[i].modality == this.mod && this.tournaments[i].category == this.cat) {
          this.tournamentsFilter[this.tamFilter] = this.tournaments[i];
          this.tamFilter++;
          console.log(this.tournamentsFilter[0]);
        }
      }
    }

    if (this.mod == "todas") {
      for (let i = 0; i < this.tournaments.length; i++) {
        if (this.tournaments[i].category == this.cat) {
          this.tournamentsFilter[this.tamFilter] = this.tournaments[i];
          this.tamFilter++;
          console.log(this.tournamentsFilter[0]);
        }
      }
    }

    if (this.cat == "todas") {
      for (let i = 0; i < this.tournaments.length; i++) {
        if (this.tournaments[i].modality == this.mod) {
          this.tournamentsFilter[this.tamFilter] = this.tournaments[i];
          this.tamFilter++;
          console.log(this.tournamentsFilter[0]);
        }
      }
    }

    if (this.mod == "todas" && this.cat == "todas") {
      this.tournamentsFilter = this.tournaments;
    }
  }

  onFilterPlayer () {
    //  console.log("modalidad: "+this.mod)
    this.playersFilter = [];
    this.tamFilterPlayer = 0;
    if (this.gen != "todas") {
      for (let i = 0; i < this.players.length; i++) {
        if (this.players[i].gender == this.gen) {
          this.playersFilter[this.tamFilterPlayer] = this.players[i];
          this.tamFilterPlayer++;
          console.log(this.playersFilter[0]);
        }
      }
    }

    if (this.gen == "todas") {
      this.playersFilter = this.players;
    }
  }



}
