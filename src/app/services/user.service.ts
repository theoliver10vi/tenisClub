import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Users } from '../models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  UserCollection: AngularFirestoreCollection<Users>;
  Users: Observable<Users[]>;
  usersInDataBase: Users[];
  UserDoc: AngularFirestoreDocument<Users>;
  userType = -1;
  constructor (public afs: AngularFirestore) { }


  logUser (user: Users): number {
    this.UserCollection = this.afs.collection<Users>('Users', ref => ref.where("name", "==", user.name).where("password", "==", user.password));
    this.Users = this.UserCollection.snapshotChanges().pipe(
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

    // if (this.usersInDataBase != null) {
    //   console.log(this.usersInDataBase[0]);
    //   return true
    // }
    // else
    //   return false;


    this.usersInDataBase.forEach(element => {
      console.log(element.id);
      if (element.id != '')
        this.userType = element.userType;
      else
        this.userType = -1;
    });
    return this.userType;
  }
}
