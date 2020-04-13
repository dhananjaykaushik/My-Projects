import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { IComponentLoad } from 'src/app/interfaces/IComponentLoad';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {

  @Input() modalMenu: MatSidenav;
  componentToLoad = null;

  constructor(
    private globalService: GlobalDataService
  ) { }

  ngOnInit() {
    this.globalService.modalEmitter.subscribe(
      {
        next: (loadComponent: IComponentLoad) => {
          if (loadComponent && loadComponent.open) {
            this.componentToLoad = loadComponent.componentToRender;
            this.modalMenu.open();
          } else {
            this.componentToLoad = null;
            this.modalMenu.close();
          }
        }
      }
    );
  }

}
