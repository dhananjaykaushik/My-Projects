import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth, User } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserRole } from '../enums/UserRole';
import { IUser } from '../interfaces/IUser';
import { GlobalDataService } from './global-data.service';
import { ITeam } from '../interfaces/ITeam';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user$: Observable<IUser>;
  userInfo: IUser;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private globalService: GlobalDataService
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
    this.user$.subscribe(
      user => {
        if (user) {
          this.userInfo = user;
          this.updateUserFromGoogle(credential.user);
        }
      }
    );
  }

  updateUserFromGoogle(user: User) {
    const userRef: AngularFirestoreDocument<IUser> = this.afStore.doc(`users/${user.uid}`);
    const data: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: (this.userInfo.role !== null && this.userInfo.role !== undefined) ? this.userInfo.role : UserRole.MEMBER,
      fullName: user.displayName,
      phoneNumber: user.phoneNumber,
      bugCounter: (this.userInfo.bugCounter !== null && this.userInfo.bugCounter !== undefined) ? this.userInfo.bugCounter : 0,
      logTracker: (this.userInfo.logTracker !== null && this.userInfo.logTracker !== undefined) ? this.userInfo.logTracker : []
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
      role: (user.role !== null && user.role !== undefined) ? user.role : UserRole.MEMBER,
      fullName: user.displayName,
      phoneNumber: user.phoneNumber,
      bugCounter: (user.bugCounter !== null && user.bugCounter !== undefined) ? user.bugCounter : 0,
      logTracker: (user.logTracker !== null && user.logTracker !== undefined) ? user.logTracker : []
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

  isRoot() {
    return this.userInfo.role === UserRole.ROOT;
  }

  isTeamLead(team: ITeam) {
    return team.teamLeads.includes(this.userInfo.uid);
  }

  isTeamMember(team: ITeam) {
    return team.teamMembers.includes(this.userInfo.uid);
  }

}
