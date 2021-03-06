import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { ITeam } from '../interfaces/ITeam';
import { AuthenticationService } from '../services/authentication.service';

@Pipe({
  name: 'bugCount'
})
export class BugCountPipe implements PipeTransform {

  constructor(
    private auth: AuthenticationService
  ) { }

  transform(value: Map<string, ITeam>): number {
    const bugTeamCount = new Map<string, number>();
    value.forEach(
      (team: ITeam) => {
        const uid = this.auth.userInfo.value.uid;
        bugTeamCount.set(uid, (team.userBugInfo && team.userBugInfo[uid]) ? team.userBugInfo[uid].bugCounter : 0);
      }
    );
    let count = 0;
    bugTeamCount.forEach(
      bugCount => count += bugCount
    );
    console.log(count);
    return count;
  }

}
