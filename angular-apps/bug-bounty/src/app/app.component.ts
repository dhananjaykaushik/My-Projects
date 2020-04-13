import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { GlobalDataService } from './services/global-data.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(
    public auth: AuthenticationService,
    public globalService: GlobalDataService,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.auth.user$.pipe(take(1)).subscribe(
      user => {
        if (!this.auth.userInfo) {
          this.auth.userInfo = user;
          this.globalService.fullPageLoader.next(false);
        }
      }
    );
    this.globalService.fullPageLoader.subscribe(
      {
        next: (isLoading) => {
          if (!isLoading) {
            if (this.auth.userInfo && (location.pathname === '/')) {
              this.router.navigate(['home']);
            } else if (!this.auth.userInfo) {
              this.router.navigate(['']);
            } else {
              this.router.navigateByUrl(location.pathname);
            }
          }
        }
      }
    );
  }

}
