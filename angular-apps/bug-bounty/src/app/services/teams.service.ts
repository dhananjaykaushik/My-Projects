import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITeam } from '../interfaces/ITeam';
import { CommonFunctions } from '../classes/CommonFunctions';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teams: Observable<ITeam>[];
  userId: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private authService: AuthenticationService
  ) {
    this.afAuth.authState.subscribe(
      user => {
        this.userId = user ? user.uid : undefined;
      }
    );
  }

  getTeams() {
    if (this.authService.userInfo.partOfTeams && this.authService.userInfo.partOfTeams.length > 0) {
      this.teams = [];
      this.authService.userInfo.partOfTeams.forEach(
        tid => {
          this.teams.push(this.afStore.doc<ITeam>(`teams/${tid}`).valueChanges());
        }
      );
    }
  }

  createTeam() {

    const teamId = CommonFunctions.generateUniqueKey(28);
    const teamRef: AngularFirestoreDocument<ITeam> = this.afStore.doc(`teams/${teamId}`);

    const data: ITeam = {
      tid: teamId,
      teamName: 'My Test Team ' + CommonFunctions.getRandomNumber(100),
      teamLeads: [this.userId],
      teamMembers: [this.userId]
    };

    teamRef.set(data, { merge: true });

    const userData: IUser = this.authService.userInfo;
    if (userData.partOfTeams) {
      userData.partOfTeams.push(teamId);
    } else {
      userData.partOfTeams = [teamId];
    }

    this.authService.updateUserValues(userData);

  }

  deleteTeam() {}

}