import { Component, OnInit } from '@angular/core';
import {MatInputModule, MatDialog} from '@angular/material';
import { TournamentService } from '../../services/tournament.service';
import { MatchService } from '../../services/match-single.service';
import { Tournament } from '../../models/tournament.model';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-tournament-registration',
  templateUrl: './tournament-registration.component.html',
  styleUrls: ['./tournament-registration.component.css']
})
export class TournamentRegistrationComponent implements OnInit {
  startDate = new Date(1990, 0, 1);
  value = ' ';
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  bufferValue = 75;
  selectedDateBegin = '';
  selectedDateEnd = '';

  tournamentIn: Tournament = {
	  name: '',
	  modality: '',
	  category: '',
	  announcementStatus: '',
	  tournamentStatus: '',
	  beginDate: '',
	  endDate: '',
	  numberOfPlayers: 0,
	  enrolledPlayers: [],
    playedRounds: [false, false, false],
    imageT: ''
  } 
  constructor(private tournamentService: TournamentService, private matchService: MatchService, private storage: AngularFireStorage, private dialog: MatDialog) { }
 //private storage: AngularFireStorage
 uploadPercent: Observable<number>;
 urlImage: Observable<string>;

  ngOnInit() {
  }

  onGuardarT(myForm: NgForm){
    if(myForm.valid == true)
    {
    //  let imgUrl : string = document.getElementById("imagenT").innerHTML.toString();
  //    console.log("Imagen:"+ unit);
    //  this.curso.imagen = imgUrl;
    this.tournamentIn.announcementStatus = 'Publicada';
    this.tournamentIn.tournamentStatus = 'Proximo';
    let imgUrl : string = document.getElementById("imagenT").innerHTML.toString();
    this.tournamentIn.imageT = imgUrl;
    this.tournamentIn.beginDate = this.selectedDateBegin.toString();
    this.tournamentIn.endDate = this.selectedDateEnd.toString();
    let y = +this.tournamentIn.numberOfPlayers;
    this.tournamentIn.numberOfPlayers = y;
    this.tournamentService.addTournament(this.tournamentIn);
    this.matchService.addTournamentMatches(this.tournamentIn);
      myForm.resetForm();
      this.dialog.closeAll();
    }
    else{
      console.log("Formulario no valido");
    }
  }

  onUpload(e)
  {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/torneo_${id}`;
    const ref = this.storage.ref(filePath);
  //  const imgr = ref.getDownloadURL();
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL())).subscribe(); 
      //console.log('subir', e.target.files[0]);
  //    console.log("IMAGEN: "+imgr.);
  console.log(this.urlImage);
  }

  onUpdateDate (event, typeDate) {
    let date = (new Date(event.target.value));
    if(typeDate == 0){
    this.selectedDateBegin = date.toLocaleDateString();
    console.log(this.selectedDateBegin);
    }
    else{
      if(typeDate == 1){
      this.selectedDateEnd = date.toLocaleDateString();
      console.log(this.selectedDateEnd);
      }
    }
  }

  closeDialog() : void {
    const dialogRef = this.dialog.closeAll();

  }

}
