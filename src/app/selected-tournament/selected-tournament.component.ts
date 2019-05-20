import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tournament } from '../models/tournament.model';
import { TournamentService } from '../services/tournament.service';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-selected-tournament',
  templateUrl: './selected-tournament.component.html',
  styleUrls: ['./selected-tournament.component.css']
})
export class SelectedTournamentComponent implements OnInit {
  tournaments: Tournament[];
  selectedTournament: Tournament;
  tournamentId: string;
  players: Player[];
  playersSelect: Player[];
  displayedColumns: string[] = ['name'];
  sourcePlayersTeams: string[];

  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
  double: boolean;
  constructor (private _route: ActivatedRoute, private tournamentService: TournamentService) { }

  ngOnInit () {
    let nameT = this._route.snapshot.paramMap.get('imageT');
    this.tournamentService.getTournamentSelect(nameT).subscribe(tournaments => {
      this.tournaments = tournaments;
      this.tournamentId = this.tournaments[0].id;
      this.selectedTournament = this.tournaments[0];
      if (this.tournaments[0].modality == 'sencillo') {
        this.double = false;
        this.sourcePlayersTeams = this.tournaments[0].enrolledPlayers;
      }
      else {
        if (this.tournaments[0].modality == 'doble') {
          this.double = true;
          this.sourcePlayersTeams = [];
          for (let i = 0; i < this.tournaments[0].enrolledPlayers.length; i = i + 2) {
            let team = this.tournaments[0].enrolledPlayers[i] + ' - ' + this.tournaments[0].enrolledPlayers[i + 1]
            this.sourcePlayersTeams.push(team);
          }
        }
      }
    });
  }

}
