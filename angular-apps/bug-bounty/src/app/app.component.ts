import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from './services/authentication.service';
import { GlobalDataService } from './services/global-data.service';

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
    this.auth.user$.subscribe(
      user => {
        if (user) {
          this.auth.userInfo.next(user);
          this.auth.loggedIn.next(true);
        }
        this.globalService.fullPageLoader.next(false);
      }
    );
    this.globalService.fullPageLoader.subscribe(
      {
        next: (isLoading) => {
          if (!isLoading) {
            if (this.auth.loggedIn.value && (location.pathname === '/')) {
              this.router.navigate(['home']);
            } else if (!this.auth.loggedIn.value) {
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
