import { Component, OnInit } from '@angular/core';

export interface Match {
  name: string;
  lastname: string;
  position: string;

}

const NEXT_MATCHES: Match[] = [
  { name: "Rafael ", lastname: 'Nadal', position: "2" },
  { name: "Novak ", lastname: 'Djokovic', position: "1"},
  { name: "Alexander ", lastname: 'Zverev', position: "5"},
  { name: "Alexander ", lastname: 'Zverev', position: "9"},
  { name: "Alexander ", lastname: 'Zverev', position: "3"},
];


@Component({
  selector: 'app-tournament-info',
  templateUrl: './tournament-info.component.html',
  styleUrls: ['./tournament-info.component.css']
})
export class TournamentInfoComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'lastname', 'position'];
  sourceNextMatches = NEXT_MATCHES;

  
  constructor() { }

  ngOnInit() {
  }

}
