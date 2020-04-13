import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject, of } from 'rxjs';
import { UserRole } from '../enums/UserRole';
import { ITeam } from '../interfaces/ITeam';
import { IUser } from '../interfaces/IUser';
import { AuthenticationService } from './authentication.service';
import { IBugLog } from '../interfaces/IBugLog';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: BehaviorSubject<IUser[]> = new BehaviorSubject([]);

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private authService: AuthenticationService
  ) { }


  isRoot() {
    return this.authService.userInfo.role === UserRole.ROOT;
  }

  isTeamLead(team: ITeam) {
    return team.teamLeads.includes(this.authService.userInfo.uid);
  }

  isTeamMember(team: ITeam) {
    return team.teamMembers.includes(this.authService.userInfo.uid);
  }

  getTotalUsers() {

    this.afStore.collection<IUser>('users/').valueChanges().subscribe(
      {
        next: (users) => {
          this.users.next(users);
        }
      }
    );
  }

  addBugToUser(uid: string, bugLog: IBugLog) {
    const userRef: AngularFirestoreDocument<IUser> = this.afStore.doc(`users/${uid}`);
    userRef.get().pipe(
      switchMap(
        user => {
          if (user) {
            return of(user.data());
          } else {
            return of(null);
          }
        }
      )
    ).subscribe(
      (user: IUser) => {
        user.bugCounter++;
        if (!user.logTracker) {
          user.logTracker = [];
        }
        user.logTracker.push(bugLog);
        userRef.set(user, { merge: true });
      }
    );
  }

  resetUserBugCount(uid: string, newBugCount?: number) {
    const userRef: AngularFirestoreDocument<IUser> = this.afStore.doc(`users/${uid}`);
    userRef.get().pipe(
      switchMap(
        user => {
          if (user) {
            return of(user.data());
          } else {
            return of(null);
          }
        }
      )
    ).subscribe(
      (user: IUser) => {
        user.bugCounter = newBugCount ? newBugCount : 0;
        user.logTracker = [];
        userRef.set(user, { merge: true });
      }
    );
  }

  removeUserFromTeam(uid: string, tid: string) {
    const userRef: AngularFirestoreDocument<IUser> = this.afStore.doc(`users/${uid}`);
    userRef.get().pipe(
      switchMap(
        user => {
          if (user) {
            return of(user.data());
          } else {
            return of(null);
          }
        }
      )
    ).subscribe(
      (user: IUser) => {
        if (user.partOfTeams && user.partOfTeams.includes(tid)) {
          user.partOfTeams.splice(user.partOfTeams.indexOf(tid), 1);
          userRef.set(user, { merge: true });
        } else {
          throw Error('User is not part of the team');
        }
      }
    );
  }

  addUsersToTeam(userIds: string[], teamId) {
    userIds.forEach(
      uid => {
        try {
          const userRef: AngularFirestoreDocument<IUser> = this.afStore.doc(`users/${uid}`);
          userRef.get().pipe(
            switchMap(
              user => {
                if (user) {
                  return of(user.data());
                } else {
                  return of(null);
                }
              }
            )
          ).subscribe(
            (user: IUser) => {
              if (!user.partOfTeams) {
                user.partOfTeams = [];
              }
              if (!user.partOfTeams.includes[teamId]) {
                user.partOfTeams.push(teamId);
                userRef.set(user, { merge: true });
              }
            }
          );
        } catch (e) {
          console.error('Error while adding ' + uid + ' to ' + teamId);
        }
      }
    );
  }

}
