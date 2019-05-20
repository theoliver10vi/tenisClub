import { Component, OnInit } from '@angular/core';

export interface Player{
  name: string;
  ranking: number;
  edad: number;
  nacimiento: string;
}

@Component({
  selector: 'app-cards-players',
  templateUrl: './cards-players.component.html',
  styleUrls: ['./cards-players.component.css']
})
export class CardsJugadoresComponent implements OnInit {
  player: Player={
    name: 'Roger Federer',
    ranking: 1,
    edad: 37,
    nacimiento: 'Berna, Suiza',
  }
  constructor() { }

  ngOnInit() {
  }

}
