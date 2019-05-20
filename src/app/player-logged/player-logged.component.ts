import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../models/player.model';
import { PlayerService } from '../services/player.service';
import { MatchService } from "../services/match-single.service";
import { Match } from '../models/match-single.model';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';





@Component({
  selector: 'app-player-logged',
  templateUrl: './player-logged.component.html',
  styleUrls: ['./player-logged.component.css']
})
export class PlayerLoggedComponent implements OnInit {
  
  playerIn: Player = {
    id:'',
    imageP: '',
  }
  players: Player[];

  MATCHES: Match[] = [

  ];

  NEXTMATCHES: Match[] = [

  ];

  displayedColumns: string[] = ['player', 'round', 'tournamentName', 'date'];
  displayedColumns2: string[] = ['player', 'round', 'tournamentName', 'date'];
  constructor (private route: ActivatedRoute, private playerService: PlayerService, private storage: AngularFireStorage, private matchService: MatchService) { }
  urlImage: Observable<string>;
  ngOnInit () {
    
    let license = this.route.snapshot.paramMap.get('password');
    console.log(license);
    this.playerService.getPlayerSelectLicense(license).subscribe(players => {
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
  onGuardarP(myForm: NgForm){
    if(myForm.valid == true)
    {
    let imgUrl : string = document.getElementById("imagenP").innerHTML.toString();
    console.log(imgUrl);
    this.playerIn=this.players[0];
    this.playerIn.imageP = imgUrl;
  
    this.playerService.updatePlayer(this.playerIn);
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
    
    task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL())).subscribe(); 
  }

}
