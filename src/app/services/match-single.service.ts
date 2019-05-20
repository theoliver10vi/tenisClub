import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Match } from "../models/match-single.model"
import { HttpClient } from '@angular/common/http';;
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Tournament } from '../models/tournament.model';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  MatchCollection: AngularFirestoreCollection<Match>;
  matchObservable: Observable<Match[]>;
  matchDoc: AngularFirestoreDocument<Match>;

  constructor (private http: HttpClient, public afs: AngularFirestore) {
    this.MatchCollection = this.afs.collection<Match>('Match');
  }

  addMatch (matchIn: Match) {
    console.log('Nuevo Partido');
    console.log(matchIn);
    this.MatchCollection.add(matchIn);
  }

  addTournamentMatches (tournament: Tournament) {
    let match: Match = {
      tournamentId: '',
      tournamentName: tournament.name,
      player: [],
      winner: [],
      round: '',
      firstRound: false,
      played: false,
      date: '',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
        ],
      }
    }
    let finalMatch: Match = {
      tournamentId: '',
      tournamentName: tournament.name,
      player: [],
      winner: [],
      round: '1',
      firstRound: false,
      played: false,
      date: '',
      suspended: false,
      score: {
        team1: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
        ],
        team2: [
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
          { points: 0, tiebreakPoints: 0 },
        ],
      }
    }

    switch (tournament.numberOfPlayers) {
      case 8: {
        for (let i = 0; i < 4; i++) {
          match.firstRound = true;
          match.round = '1/4';
          this.addMatch(match);
        }
        for (let i = 0; i < 2; i++) {
          match.firstRound = false;
          match.round = '1/2';
          this.addMatch(match);
        }
        this.addMatch(finalMatch);
      }
        break;
      case 16: {
        for (let i = 0; i < 8; i++) {
          match.firstRound = true;
          match.round = '1/8';
          this.addMatch(match);
        }
        for (let i = 0; i < 4; i++) {
          match.firstRound = false;
          match.round = '1/4';
          this.addMatch(match);
        }
        for (let i = 0; i < 2; i++) {
          match.firstRound = false;
          match.round = '1/2';
          this.addMatch(match);
        }
        this.addMatch(finalMatch);
      }
        break;
      case 32: {
        for (let i = 0; i < 16; i++) {
          match.firstRound = true;
          match.round = '1/16';
          this.addMatch(match);
        }
        for (let i = 0; i < 8; i++) {
          match.firstRound = false;
          match.round = '1/8';
          this.addMatch(match);
        }
        for (let i = 0; i < 4; i++) {
          match.firstRound = false;
          match.round = '1/4';
          this.addMatch(match);
        }
        for (let i = 0; i < 2; i++) {
          match.firstRound = false;
          match.round = '1/2';
          this.addMatch(match);
        }
        this.addMatch(finalMatch);
      }

        break;

      default:
        console.log("La cantidad de jugadores: " + tournament.numberOfPlayers + " no esta permitida!");
        break;
    }
  }

  getMatch (id: string) {
    this.MatchCollection = this.afs.collection<Match>('Match');
    return this.MatchCollection.doc(id).valueChanges();
  }

  getPlayedMatchesFromPlayer (player: string): Observable<Match[]> {
    this.MatchCollection = this.afs.collection<Match>('Match');
    this.matchObservable = this.MatchCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Match;
        const id = a.payload.doc.id;
        if (data.player.includes(player))
          return { id, ...data };
        return (null);
      }).filter(element => element != null && element.played))
    );
    return this.matchObservable;
  }

  getNextMatchesFromPlayer (player: string): Observable<Match[]> {
    let playerMatches: Match[];
    this.MatchCollection = this.afs.collection<Match>('Match');
    this.matchObservable = this.MatchCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Match;
        const id = a.payload.doc.id;
        if (data.player.includes(player))
          return { id, ...data };
        return (null);
      }).filter(element => element != null && !element.played))
    );
    return this.matchObservable;
  }

  getMatchesFromPlayer (player: string): Observable<Match[]> {
    let playerMatches: Match[];
    this.MatchCollection = this.afs.collection<Match>('Match');
    this.matchObservable = this.MatchCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Match;
        const id = a.payload.doc.id;
        if (data.player.includes(player))
          return { id, ...data };
        return (null);
      }).filter(element => element != null))
    );
    return this.matchObservable;
  }

  getPlayedMatches (): Observable<Match[]> {
    this.MatchCollection = this.afs.collection<Match>('Match', ref => ref.where("played", "==", true));
    this.matchObservable = this.MatchCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Match;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.matchObservable;
  }

  getMatchesFromTournament (tournament: Tournament): Observable<Match[]> {
    this.MatchCollection = this.afs.collection<Match>('Match', ref => ref.where("tournamentName", "==", tournament.name.toString()));
    this.matchObservable = this.MatchCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Match;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.matchObservable;
  }

  getMatchesFromDate (date: string): Observable<Match[]> {
    this.MatchCollection = this.afs.collection<Match>('Match', ref => ref.where("date", "==", date));
    this.matchObservable = this.MatchCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Match;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.matchObservable;
  }

  deleteMatch (match: Match) {
    console.log('Borrar Curso');
    this.matchDoc = this.afs.doc(`Match/${match.id}`)
    this.matchDoc.delete();
  }

  updateMatch (match: Match) {
    this.matchDoc = this.afs.doc(`Match/${match.id}`);
    this.matchDoc.update(match);
  }

}
