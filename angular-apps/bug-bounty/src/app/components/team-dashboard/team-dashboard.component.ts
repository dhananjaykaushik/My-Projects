import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.sass']
})
export class TeamDashboardComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      {
        next: (params: ParamMap) => {
          console.log(params.get('teamId'));
        }
      }
    );
  }

}
