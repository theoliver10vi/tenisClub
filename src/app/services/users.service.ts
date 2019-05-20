import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Users } from '../models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  UsersCollection: AngularFirestoreCollection<Users>;
  Users: Observable<Users[]>;
  usersInDataBase: Users[];
  usersF: Observable <Users[]>;
  UsersDoc: AngularFirestoreDocument<Users>;
  userType = -1;
  constructor (private http: HttpClient, public afs: AngularFirestore) { this.UsersCollection=this.afs.collection<Users>('Users');}


  logUser (users: Users): number {
    this.UsersCollection = this.afs.collection<Users>('Users', ref => ref.where("name", "==", users.name).where("password", "==", users.password));
    this.Users = this.UsersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Users;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    this.Users.subscribe(usersFromFirebase => {
      this.usersInDataBase = usersFromFirebase;
      console.log(this.usersInDataBase);
    })

    this.usersInDataBase.forEach(element => {
      console.log(element.id);
      if (element.id != '')
        this.userType = element.userType;
      else
        this.userType = -1;
    });
    return this.userType;
  }

    addUsers(UsersIn: Users){
    console.log('Nuevo Usuario');
    this.UsersCollection.add(UsersIn);
  }

}
