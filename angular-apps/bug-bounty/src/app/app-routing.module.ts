import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { TeamDashboardComponent } from './components/team-dashboard/team-dashboard.component';
import { PartOfTeamGuard } from './guards/part-of-team.guard';


const routes: Routes = [
  {
    path: '', component: AppComponent, pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      {
        path: 'teams/:teamId', component: TeamDashboardComponent,
        canActivate: [AuthGuard], outlet: 'teamdashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
