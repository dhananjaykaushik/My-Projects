import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Actions } from 'src/app/classes/Actions';
import { CommonFunctions } from 'src/app/classes/CommonFunctions';
import { bugSeverityColorGetter, bugSeverityNameGetter } from 'src/app/enums/BugSeverity';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { IAction } from 'src/app/interfaces/IAction';
import { ActionId } from 'src/app/enums/ActionId';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { CreateTeamFormComponent } from 'src/app/templates/create-team-form/create-team-form.component';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOverviewComponent implements OnInit {

  actions = Actions;
  commonFunctions = CommonFunctions;
  bugSeverityColorGetter = bugSeverityColorGetter;
  bugSeverityNameGetter = bugSeverityNameGetter;
  constructor(
    public authService: AuthenticationService,
    public userService: UserService,
    private globalService: GlobalDataService
  ) {
  }

  ngOnInit() {
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

}

