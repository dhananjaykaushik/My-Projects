import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FulfillingSquareSpinnerModule } from 'angular-epic-spinners';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TeamDashboardComponent } from './components/team-dashboard/team-dashboard.component';
import { UserOverviewComponent } from './components/user-overview/user-overview.component';
import { AngularModule } from './modules/angular/angular.module';
import { CountFormatPipe } from './pipes/count-format.pipe';
import { CreateTeamFormComponent } from './templates/create-team-form/create-team-form.component';
import { BugLogPipe } from './pipes/bug-log.pipe';
import { BugCountPipe } from './pipes/bug-count.pipe';



const config = {
  apiKey: 'AIzaSyBL1ptlVmpOX3UhaBOR0VkfHqf-CEKoRwY',
  authDomain: 'key-acre-273614.firebaseapp.com',
  databaseURL: 'https://key-acre-273614.firebaseio.com',
  projectId: 'key-acre-273614',
  storageBucket: 'key-acre-273614.appspot.com',
  messagingSenderId: '593456742914',
  appId: '1:593456742914:web:87be64f536288f82ee9d1b',
  measurementId: 'G-NTS6WX2WM5'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavComponent,
    TeamDashboardComponent,
    UserOverviewComponent,
    CountFormatPipe,
    ModalComponent,
    CreateTeamFormComponent,
    BugLogPipe,
    BugCountPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularModule,
    FulfillingSquareSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CreateTeamFormComponent]
})
export class AppModule { }
