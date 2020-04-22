import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth, User } from 'firebase';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserRole } from '../enums/UserRole';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user$: Observable<IUser>;
  userInfo: BehaviorSubject<IUser> = new BehaviorSubject(null);
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
    userRef.get().pipe(
      switchMap(
        u => {
          if (u) {
            return of(u.data());
          } else {
            return of(null);
          }
        }
      )
    ).subscribe(
      (userData: IUser) => {
        const data: IUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: UserRole.MEMBER,
          fullName: user.displayName,
          phoneNumber: user.phoneNumber
        };
        if (userData) {
          data.role = userData.role;
          data.fullName = userData.fullName;
        }
        this.updateUser(userRef, data);
      }
    );
  }

  updateUserValues(user: IUser) {
    const userRef: AngularFirestoreDocument<IUser> = this.afStore.doc(`users/${user.uid}`);
    const data: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: (user.role !== null && user.role !== undefined) ? user.role : UserRole.MEMBER,
      fullName: user.displayName,
      phoneNumber: user.phoneNumber
    };
    if (user.partOfTeams && user.partOfTeams.length > 0) {
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
