import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Tournament } from '../models/tournament.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';
//import { cursorTo } from 'readline';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  TournamentCollection: AngularFirestoreCollection<Tournament>;
  tournamentObser: Observable<Tournament[]>;
  tournamentF: Observable<Tournament[]>;
  tournamentDoc: AngularFirestoreDocument<Tournament>;
  startDate = new Date();

  constructor (public afs: AngularFirestore) {
    this.TournamentCollection = this.afs.collection<Tournament>('Tournaments');
  }

  getTournament () {
    //  this.cursosCollection = this.afs.collection<CursoInterface>('cursos', ref => ref.where("tecnologia", "==", tec).where("precio", ">", "500"));
    // this.cursosCollection = this.afs.collection<CursoInterface>('cursos', ref => ref.where("tecnologia", "==", tec));  
    this.TournamentCollection = this.afs.collection<Tournament>('Tournaments');
    this.tournamentObser = this.TournamentCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Tournament;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.tournamentObser;
  }

  getTournamentSelect (imageT) {
    this.TournamentCollection = this.afs.collection<Tournament>('Tournaments', ref => ref.where("imageT", "==", imageT));
    this.tournamentObser = this.TournamentCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Tournament;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.tournamentObser;
  }

  getTournamentFromName (name: string) {
    this.TournamentCollection = this.afs.collection<Tournament>('Tournaments', ref => ref.where("name", "==", name));
    this.tournamentObser = this.TournamentCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Tournament;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.tournamentObser;
  }

  getTournamentFromId (id: string) {
    this.TournamentCollection = this.afs.collection<Tournament>('Tournaments');
    return this.TournamentCollection.doc(id).valueChanges();
  }

  addTournament (tournamentIn: Tournament) {
    console.log('Nuevo Torneo');
    this.TournamentCollection.add(tournamentIn);
  }

  updateTournament (tournament: Tournament) {
    console.log('Actualizar Torneo');
    this.tournamentDoc = this.afs.doc(`Tournaments/${tournament.id}`);
    this.tournamentDoc.update(tournament);
  }
}
