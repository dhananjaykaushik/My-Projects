import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';
import { ITeam } from 'src/app/interfaces/ITeam';
import { take } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/interfaces/IUser';
import { UserRole } from 'src/app/enums/UserRole';
import { Actions } from 'src/app/classes/Actions';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IAction } from 'src/app/interfaces/IAction';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoModalComponent } from 'src/app/templates/user-info-modal/user-info-modal.component';
import { IUserInfo } from 'src/app/interfaces/IUserInfo';
import { ActionId } from 'src/app/enums/ActionId';
import { BugCountSetComponent } from 'src/app/templates/bug-count-set/bug-count-set.component';
import { AddUserBugComponent } from 'src/app/templates/add-user-bug/add-user-bug.component';
import { IBugLog } from 'src/app/interfaces/IBugLog';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.sass']
})
export class TeamDashboardComponent implements OnInit {

  teamData: BehaviorSubject<ITeam> = new BehaviorSubject(null);
  userData: Record<string, BehaviorSubject<IUser>> = {};
  allMembers: BehaviorSubject<string[]> = new BehaviorSubject([]);
  actions = Actions;
  userRole = UserRole;

  constructor(
    private route: ActivatedRoute,
    private teamsService: TeamsService,
    public userService: UserService,
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      {
        next: (params: ParamMap) => {
          const teamId = params.get('teamId');
          const teamData: ITeam = this.teamsService.routedTeam.value;
          if (teamData && teamData.tid === teamId) {
            this.populateTeamData(teamData);
          } else {
            this.teamsService.teams.subscribe(
              {
                next: (teamObservables: Observable<ITeam>[]) => {
                  teamObservables.forEach(
                    (teamObs: Observable<ITeam>) => {
                      teamObs.subscribe(
                        (team: ITeam) => {
                          if (team && team.tid === teamId) {
                            this.populateTeamData(team);
                          }
                        }
                      );
                    }
                  );
                }
              }
            );
          }
        }
      }
    );
  }


  populateTeamData(teamData: ITeam) {
    const userIds = [...new Set([...teamData.teamMembers, ...teamData.teamLeads])];
    this.loadUserData(userIds);
    this.teamData.next(teamData);
    this.allMembers.next(userIds);
  }

  loadUserData(userIds: string[]) {
    this.userData = this.userService.getUsersInfo(userIds);
  }

  getRole(): UserRole {
    if (this.authService.userInfo.value && this.authService.userInfo.value.role === UserRole.ROOT) {
      return UserRole.ROOT;
    }
    if (this.teamData.value && this.teamData.value.teamLeads.includes(this.authService.userInfo.value.uid)) {
      return UserRole.TEAM_LEAD;
    }
    return UserRole.MEMBER;
  }

  performAction(action: IAction, uid: string) {
    if (action.actionId === ActionId.RESET_USER_BUG_COUNT) {
      if (this.teamData.value.userBugInfo[uid].bugCounter !== 0) {
        if (!this.teamData.value.userBugInfo[uid].history) {
          this.teamData.value.userBugInfo[uid].history = [];
        }
        this.teamData.value.userBugInfo[uid].history.push(this.teamData.value.userBugInfo[uid].bugCounter);
        this.teamData.value.userBugInfo[uid].bugCounter = 0;
        this.teamsService.updateTeam(this.teamData.value);
      }
    } else if (action.actionId === ActionId.SET_USER_BUG_COUNT) {
      const dialogRef = this.dialog.open(BugCountSetComponent, {
        width: '280px'
      });
      dialogRef.afterClosed().subscribe(bugCount => {
        if (bugCount !== undefined && bugCount !== null && this.teamData.value.userBugInfo[uid].bugCounter !== +bugCount) {
          if (!this.teamData.value.userBugInfo[uid].history) {
            this.teamData.value.userBugInfo[uid].history = [];
          }
          this.teamData.value.userBugInfo[uid].history.push(this.teamData.value.userBugInfo[uid].bugCounter);
          this.teamData.value.userBugInfo[uid].bugCounter = +bugCount;
          this.teamsService.updateTeam(this.teamData.value);
        }
      });
    } else if (action.actionId === ActionId.MAKE_TEAM_LEADER) {
      if (!this.teamData.value.teamLeads.includes(uid)) {
        this.teamData.value.teamLeads.push(uid);
        this.teamsService.updateTeam(this.teamData.value);
      }
    } else if (action.actionId === ActionId.REMOVE_MEMBER_FROM_TEAM) {
      this.teamsService.deleteUserFromTeam(uid, this.teamData.value.tid);
      this.userService.removeUserFromTeam(uid, this.teamData.value.tid);
    } else if (action.actionId === ActionId.REMOVE_USER_FROM_APP) {
      if (this.userData[uid].value) {
        this.userData[uid].value.partOfTeams.forEach(
          tid => {
            this.teamsService.deleteUserFromTeam(uid, tid);
          }
        );
        this.userService.removeUserFromApp(uid);
      }
    } else if (action.actionId === ActionId.ADD_BUG) {
      const dialogRef = this.dialog.open(AddUserBugComponent, {
        width: '310px'
      });
      dialogRef.afterClosed().subscribe((bugLog: IBugLog) => {
        if (this.teamData.value.userBugInfo[uid].logTracker && this.teamData.value.userBugInfo[uid].logTracker.length) {
          this.teamData.value.userBugInfo[uid].logTracker = [];
        }
        this.teamData.value.userBugInfo[uid].logTracker.push(bugLog);
        ++this.teamData.value.userBugInfo[uid].bugCounter;
        this.teamsService.updateTeam(this.teamData.value);
      });
    }
  }
  showUserInfo(user: BehaviorSubject<IUser>) {
    const userInfo: IUserInfo = {
      userData: user.value,
      teamData: this.teamData.value
    };
    this.dialog.open(UserInfoModalComponent, {
      width: '280px',
      data: userInfo
    });

  }

}
