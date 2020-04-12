import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Actions } from 'src/app/classes/Actions';
import { CommonFunctions } from 'src/app/classes/CommonFunctions';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOverviewComponent implements OnInit {

  actions = Actions;
  commonFunctions = CommonFunctions;

  constructor(
    public authService: AuthenticationService
  ) {
  }

  ngOnInit() {
  }

}
