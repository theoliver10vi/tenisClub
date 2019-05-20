import { Component, OnInit } from '@angular/core';
import { Users } from '../models/user.model';
import { UsersService } from "../services/users.service";
import { TournamentService } from '../services/tournament.service';
import { Tournament } from '../models/tournament.model';
import { Cat, Mod, Gen, More } from '../tournaments/tournaments.component';
import { MockResourceLoader } from '@angular/compiler/testing';



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
  value:number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: Users[];
  
  tournaments: Tournament[];

  cats: Cat[] = [
    {value: 'varonil-0', viewValue: 'Varonil'},
    {value: 'femenil-1', viewValue: 'Femenil'},
    {value: 'mixto-2', viewValue: 'Mixto'}
  ];

  mods: Mod[] = [
    {value: 'sencillos-0', viewValue: 'Sencillos'},
    {value: 'dobles-1', viewValue: 'Dobles'}
  ];

  gens: Gen[] = [
    {value: 'femenino-0', viewValue: 'Femenino'},
    {value: 'masculino-1', viewValue: 'Masculino'}
  ];

  more:More={
    value:3
  }

  //LLAVES TORNEOS
  inside = false;

  onInside () {
    this.inside = true;
  }

  onOutside () {
    this.inside = false;
  }
  //

  constructor (private userService: UsersService, private tournamentService: TournamentService) { }
/*
  onClick(){
      this.more.value=this.more.value+3;
  }*/
/*
  ngOnInit () { }
  images = [1, 2, 3].map(() => `https://picsum.photos/1000/600?random&t=${Math.random()}`);
  this.tournamentService.getTournament().subscribe(tournaments => {
    this.tournaments = tournaments;
    console.log(this.tournaments);
}
*/

ngOnInit() {
  this.tournamentService.getTournament().subscribe(tournaments => {
    this.tournaments = tournaments;
    console.log(this.tournaments);
  });
}

}