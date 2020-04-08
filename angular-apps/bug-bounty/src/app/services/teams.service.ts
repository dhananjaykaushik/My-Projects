import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITeam } from '../interfaces/ITeam';
import { CommonFunctions } from '../classes/CommonFunctions';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teams$: Observable<ITeam[]>;
  userId: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    this.afAuth.authState.subscribe(
      user => {
        this.userId = user ? user.uid : undefined;
      }
    );
  }

  getTeams() {

  }

  createTeam() {

    const teamId = CommonFunctions.generateUniqueKey(28);
    const teamRef: AngularFirestoreDocument<ITeam> = this.afStore.doc(`teams/${teamId}`);

    const data: ITeam = {
      tid: teamId,
      teamName: 'My Test Team ' + CommonFunctions.getRandomNumber(100),
      teamLeads: [this.userId]
    };

    return teamRef.set(data, { merge: true });
  }

  deleteTeam() {}

}
