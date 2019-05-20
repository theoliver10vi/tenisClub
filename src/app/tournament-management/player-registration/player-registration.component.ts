import { Component, OnInit } from '@angular/core';
import {MatInputModule, MatDialog} from '@angular/material';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player.model';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { UsersService } from "../../services/users.service";
import{Users} from '../../models/user.model'

@Component({
  selector: 'app-player-registration',
  templateUrl: './player-registration.component.html',
  styleUrls: ['./player-registration.component.css']
})
export class PlayerRegistrationComponent implements OnInit {
  startDate = new Date(1990, 0, 1);
  value = ' ';
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  bufferValue = 75;

  playerIn: Player = {
	  name: '',
	  age: 0,
	  tournamentsEnrolled: [''],
	  currentRank: 0,
	  playerCountry: '',
	  playerPoints: 0,
    imageP: '',
    license: '',
    federation: '',
    gender: ''
  } 

  UsersIn: Users={
      name: '',
      password: '',
      userType:2

  }

  constructor(private playerService: PlayerService, private storage: AngularFireStorage, private dialog: MatDialog, private usersService: UsersService) { }
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
  }

  onGuardarP(myForm: NgForm){
    if(myForm.valid == true)
    {
    let imgUrl : string = document.getElementById("imagenP").innerHTML.toString();
    this.playerIn.imageP = imgUrl;
    this.playerService.addPlayer(this.playerIn);
    this.usersService.addUsers(this.UsersIn);
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
    const filePath = `players/player_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL())).subscribe(); 
  }

  closeDialog() : void {
    const dialogRef = this.dialog.closeAll();
  }

}
