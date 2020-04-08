import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User, auth } from 'firebase';
import { UserRole } from '../enums/UserRole';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user$: Observable<IUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(
        user => {
          if (user) {
            return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        }
      )
    );
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserFromGoogle(credential.user);
  }

  updateUserFromGoogle(user: User) {
    const userRef: AngularFirestoreDocument<IUser> = this.afStore.doc(`users/${user.uid}`);
    const data: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: UserRole.MEMBER,
      fullName: user.displayName,
      phoneNumber: user.phoneNumber
    };
    this.updateUser(userRef, data);
  }

  updateUserValues(user: IUser) {
    const userRef: AngularFirestoreDocument<IUser> = this.afStore.doc(`users/${user.uid}`);
    const data: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: UserRole.MEMBER,
      fullName: user.displayName,
      phoneNumber: user.phoneNumber
    };
    if (user.partOfTeams && user.partOfTeams.size > 0) {
      data.partOfTeams = user.partOfTeams;
    }
    this.updateUser(userRef, data, true);
  }

  updateUser(userRef: AngularFirestoreDocument, data: IUser, alterData = false) {
    if (alterData) {
      // It will replace existing data
      return userRef.set(data);
    }

    // It will only update the values changed
    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
