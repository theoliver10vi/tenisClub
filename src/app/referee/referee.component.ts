import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from '../models/tournament.model';
import { TournamentService } from '../services/tournament.service';

interface More {
  value: number;
}


@Component({
  selector: 'app-referee',
  templateUrl: './referee.component.html',
  styleUrls: ['./referee.component.css']
})
export class RefereeComponent implements OnInit {
  tournaments: Tournament[];
  tournamentsFilter: Tournament[] = [];
  tamFilter: number = 0;

  cat: string = "todas";
  mod: string = "todas";

  more: More = {
    value: 3
  }

  more2: More = {
    value: 3
  }
  constructor (private router: Router, private tournamentService: TournamentService) { }
  onClick () {
    this.more.value = this.more.value + 3;
  }

  onClick2 () {
    this.more2.value = this.more2.value + 3;
  }

  ngOnInit () {
    this.tournamentService.getTournament().subscribe(tournaments => {
      this.tournaments = tournaments;
      if (this.mod == "todas" && this.cat == "todas")
        this.tournamentsFilter = tournaments;
      console.log(this.tournaments);
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

    if (this.mod == "todas" && this.cat == "todas")
      this.tournamentsFilter = this.tournaments;
  }



  onLoadTournament () {
    // this.router.navigate(['arbitro', this.selectedTournamentId]);
  }

  onLoadTournamentManagment () {
    // this.router.navigate(['admin/torneo/', this.tournamentName]);
  }
}
