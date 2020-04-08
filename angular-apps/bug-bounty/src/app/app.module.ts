import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HomeComponent } from './components/home/home.component';
import { TeamsComponent } from './components/home/teams/teams.component';
import { BugBountiesComponent } from './components/home/bug-bounties/bug-bounties.component';

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
    TeamsComponent,
    BugBountiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
