import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player, PlayerFromAPI, } from "../models/player.model";
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  urlATP = "https://vbarbaresi.opendatasoft.com/api/records/1.0/search/?dataset=atp-rankings&rows=100&sort=-current_rank&facet=player_country&facet=current_rank";
  urlWTA = "https://vbarbaresi.opendatasoft.com/api/records/1.0/search/?dataset=wta-rankings&rows=100&sort=-current_rank&facet=current_rank&facet=player_country";
  playerCollection: AngularFirestoreCollection<Player>;
  playerObser: Observable<Player[]>;
  playerF: Observable<Player[]>;
  playerDoc: AngularFirestoreDocument<Player>;

  constructor (private http: HttpClient, public afs:AngularFirestore) 
  { 
    this.playerCollection = this.afs.collection<Player>('Player');
  }

  getPlayer()
  {
  //  this.cursosCollection = this.afs.collection<CursoInterface>('cursos', ref => ref.where("tecnologia", "==", tec).where("precio", ">", "500"));
 // this.cursosCollection = this.afs.collection<CursoInterface>('cursos', ref => ref.where("tecnologia", "==", tec));  
  this.playerCollection = this.afs.collection<Player>('Player');
    this.playerObser = this.playerCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Player;
        const id = a.payload.doc.id;
        return {id, ...data };
      }))
    );
    return this.playerObser;
  }

  getPlayerSelect(imageP)
  {
    this.playerCollection = this.afs.collection<Player>('Player', ref => ref.where("imageP", "==", imageP));
    this.playerObser = this.playerCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Player;
        const id = a.payload.doc.id;
        return {id, ...data };
      }))
    );
    return this.playerObser;
  }

  getPlayerSelectLicense(license)
  {
    this.playerCollection = this.afs.collection<Player>('Player', ref => ref.where("license", "==", license));
    this.playerObser = this.playerCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Player;
        const id = a.payload.doc.id;
        return {id, ...data };
      }))
    );
    return this.playerObser;
  }


  getPlayerSelectName(name)
  {
    this.playerCollection = this.afs.collection<Player>('Player', ref => ref.where("name", "==", name));
    this.playerObser = this.playerCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Player;
        const id = a.payload.doc.id;
        return {id, ...data };
      }))
    );
    return this.playerObser;
  }

  addPlayer(playerIn: Player){
    console.log('Nuevo Jugador');
    this.playerCollection.add(playerIn);
  }

  private extractData (res: Response) {
    let body = res;
    return body || {};
  }

  public getAtpRanking (): Observable<any> {
    return this.http.get(this.urlATP).pipe(map(this.extractData));
  }

  public getWtaRanking (): Observable<any> {
    return this.http.get(this.urlWTA).pipe(map(this.extractData));
  }

  updatePlayer (player: Player) {
    this.playerDoc = this.afs.doc(`Player/${player.id}`);
    this.playerDoc.update(player);
  }
  
}
