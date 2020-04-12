import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartOfTeamGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.user$.pipe(
      take(1), // Complete observable after first value is emitted
      map(user => (user.partOfTeams && user.partOfTeams.includes(next.paramMap.get('teamId')))), // map to boolean
      tap(
        loggedIn => {
          if (!loggedIn) {
            console.log('Access Denied');
            this.router.navigate(['']);
          }
        }
      )
    );
  }

}
