import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UserRole } from '../enums/UserRole';
import { IUser } from '../interfaces/IUser';
import { AuthenticationService } from './authentication.service';

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

  getUsersInfo(uids: string[]): Record<string, BehaviorSubject<IUser>> {
    const userInfos: Record<string, BehaviorSubject<IUser>> = {};

    uids.forEach(
      uid => {
        const userRef: AngularFirestoreDocument<IUser> = this.afStore.doc(`users/${uid}`);
        userInfos[uid] = new BehaviorSubject(null);
        userRef.get().pipe(
          take(1),
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
          {
            next: (user: IUser) => {
              userInfos[uid].next(user);
            }
          }
        );
      }
    );

    return userInfos;
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

  isRoot() {
    return this.authService.userInfo.value.role === UserRole.ROOT;
  }

}

