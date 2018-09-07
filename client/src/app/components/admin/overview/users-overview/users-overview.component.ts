import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { OverviewPage } from '../../../../shared/interfaces';
import { AnalyticsService } from '../../../../shared/services/analytics.service';

@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss']
})
export class UsersOverviewComponent implements OnInit {

  userData$: Observable<OverviewPage>;

  constructor(
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit() {
    this.userData$ = this.analyticsService.getUserOverview();
  }

}
