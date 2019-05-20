import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../models/player.model';
import { PlayerService } from '../services/player.service';
import { MatchService } from "../services/match-single.service";
import { Match } from '../models/match-single.model';

export interface Match {
  result?: boolean;
  opponentName: string;
  round: string;
  tournament: string;
  matchDate: string;
}

@Component({
  selector: 'app-selected-player',
  templateUrl: './selected-player.component.html',
  styleUrls: ['./selected-player.component.css']
})
export class SelectedPlayerComponent implements OnInit {
  players: Player[];

  MATCHES: Match[] = [

  ];

  NEXTMATCHES: Match[] = [

  ];

  displayedColumns: string[] = ['player', 'round', 'tournamentName', 'date'];
  displayedColumns2: string[] = ['player', 'round', 'tournamentName', 'date'];
  constructor (private route: ActivatedRoute, private playerService: PlayerService, private matchService: MatchService) { }
  
  ngOnInit () {
    
    let nameP = this.route.snapshot.paramMap.get('imageP');
    this.playerService.getPlayerSelect(nameP).subscribe(players =>{
      this.players = players;
      
      console.log(this.players);
      this.matchService.getPlayedMatchesFromPlayer(this.players[0].name).subscribe(matches =>{
        this.MATCHES=matches;
        console.log(this.MATCHES) 
      });

      this.matchService.getNextMatchesFromPlayer(this.players[0].name).subscribe(matches =>{
        this.NEXTMATCHES=matches;
      });
    });

  }
}