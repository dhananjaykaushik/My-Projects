import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatMenuModule } from '@angular/material/menu';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    MatSidenavModule,
    MatTooltipModule,
    MatCardModule,
    MatMenuModule
  ]
})
export class AngularModule { }
