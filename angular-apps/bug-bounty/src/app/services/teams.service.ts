import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ITeam } from '../interfaces/ITeam';
import { IUser } from '../interfaces/IUser';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teams: BehaviorSubject<Observable<ITeam>[]> = new BehaviorSubject([]);
  userId: string;
  routedTeam: BehaviorSubject<ITeam> = new BehaviorSubject(null);

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    this.afAuth.authState.subscribe(
      user => {
        this.userId = user ? user.uid : undefined;
      }
    );
  }

  getTeams() {
    if (this.authService.userInfo.value) {
      if (this.userService.isRoot()) {
        this.afStore.collection<ITeam>(`teams/`).valueChanges().subscribe(
          (teamsCollection: ITeam[]) => {
            const teams: Observable<ITeam>[] = [];
            teamsCollection.forEach(
              (team: ITeam) => {
                teams.push(this.afStore.doc<ITeam>(`teams/${team.tid}`).valueChanges());
              }
            );
            this.teams.next(teams);
          }
        );
      } else if (!this.userService.isRoot() && this.authService.userInfo.value.partOfTeams &&
        this.authService.userInfo.value.partOfTeams.length) {
        const teams: Observable<ITeam>[] = [];
        this.authService.userInfo.value.partOfTeams.forEach(
          (tid: string) => {
            teams.push(this.afStore.doc<ITeam>(`teams/${tid}`).valueChanges());
          }
        );
        this.teams.next(teams);
      }
    }
  }

  createTeam(teamData: ITeam) {
    const teamRef: AngularFirestoreDocument<ITeam> = this.afStore.doc(`teams/${teamData.tid}`);
    teamRef.set(teamData, { merge: true });
  }

  deleteUserFromTeam(uid: string, tid: string) {
    const teamRef: AngularFirestoreDocument<ITeam> = this.afStore.doc(`teams/${tid}`);
    teamRef.get().pipe(
      switchMap(
        team => {
          if (team) {
            return of(team.data());
          } else {
            return of(null);
          }
        }
      )
    ).subscribe(
      {
        next: (team: ITeam) => {
          let flag = false;
          if (team.teamLeads.includes(uid)) {
            flag = true;
            team.teamLeads.splice(team.teamLeads.indexOf(uid), 1);
          }
          if (team.teamMembers.includes(uid)) {
            flag = true;
            team.teamMembers.splice(team.teamMembers.indexOf(uid), 1);
          }
          if (flag) {
            teamRef.set(team, { merge: true });
          }
        }
      }
    );
  }

  updateTeam(team: ITeam) {
    const teamRef: AngularFirestoreDocument<ITeam> = this.afStore.doc(`teams/${team.tid}`);
    teamRef.set(team, { merge: true });
  }

  deleteTeam() { }

}
