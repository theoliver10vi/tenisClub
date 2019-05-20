import { Component, OnInit } from '@angular/core';
import { Tournament } from '../models/tournament.model';
import { TournamentService } from '../services/tournament.service';

export interface More {
  value:number;
}

@Component({
  selector: 'app-brochure-view',
  templateUrl: './brochure-view.component.html',
  styleUrls: ['./brochure-view.component.css']
})
export class BrochureViewComponent implements OnInit {
  tournaments: Tournament[];
  tournamentsFilter: Tournament[] = [];
  tamFilter: number = 0;

  cat: string = "todas";
  mod: string = "todas";

  more:More={
    value:3
  }

  constructor(private tournamentService: TournamentService) { }

  onClick(){
    this.more.value=this.more.value+3;
  }

  ngOnInit() {
    this.tournamentService.getTournament().subscribe(tournaments => {
      this.tournaments = tournaments;
      if(this.mod == "todas" && this.cat == "todas"){
        this.tournamentsFilter = tournaments;
        }
      console.log(this.tournaments);
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

}
