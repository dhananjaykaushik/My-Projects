import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Actions } from 'src/app/classes/Actions';
import { CommonFunctions } from 'src/app/classes/CommonFunctions';
import { bugSeverityColorGetter, bugSeverityNameGetter } from 'src/app/enums/BugSeverity';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { IAction } from 'src/app/interfaces/IAction';
import { ActionId } from 'src/app/enums/ActionId';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { CreateTeamFormComponent } from 'src/app/templates/create-team-form/create-team-form.component';
import { TeamsService } from 'src/app/services/teams.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { IBugLog } from 'src/app/interfaces/IBugLog';
import { ITeam } from 'src/app/interfaces/ITeam';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOverviewComponent implements OnInit {

  bugLogs: Map<string, ITeam> = new Map<string, ITeam>();
  totalBugs: BehaviorSubject<number> = new BehaviorSubject(0);

  totalBugCount: BehaviorSubject<number> = new BehaviorSubject(0);
  allBugLogs: BehaviorSubject<IBugLog[]> = new BehaviorSubject([]);

  actions = Actions;
  commonFunctions = CommonFunctions;
  bugSeverityColorGetter = bugSeverityColorGetter;
  bugSeverityNameGetter = bugSeverityNameGetter;
  constructor(
    public authService: AuthenticationService,
    public userService: UserService,
    private globalService: GlobalDataService,
    public teamsService: TeamsService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.getAllBugLogs();
    if (this.userService.isRoot()) {
      this.userService.getTotalUsers();
    }
  }

  actionPerformed(action: IAction) {
    if (action.actionId === ActionId.CREATE_TEAM) {
      this.globalService.modalEmitter.next({
        componentToRender: CreateTeamFormComponent,
        open: true
      });
    }
  }

  getAllBugLogs() {
    this.teamsService.teams.subscribe(
      {
        next: (teams: Observable<ITeam>[]) => {
          teams.forEach(
            (teamObs: Observable<ITeam>) => {
              teamObs.subscribe(
                {
                  next: (team: ITeam) => {
                    this.bugLogs = this.bugLogs.set(team.teamName, team);
                    this.updateTotalBugCount();
                    this.updateBugLogs();
                  }
                }
              );
            }
          );
        }
      }
    );
  }

  updateTotalBugCount() {
    this.bugLogs.forEach(
      (team: ITeam) => {
        this.totalBugCount.next(this.totalBugCount.value + team.userBugInfo[this.authService.userInfo.value.uid].bugCounter);
        this.cdr.detectChanges();
      }
    );
  }

  updateBugLogs() {
    this.bugLogs.forEach(
      (team: ITeam) => {
        this.allBugLogs.value.push(...team.userBugInfo[this.authService.userInfo.value.uid].logTracker);
        this.cdr.detectChanges();
      }
    );
  }

}

