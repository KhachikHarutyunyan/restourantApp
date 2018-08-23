import { OverviewPage } from './../../../shared/interfaces';
import { Observable } from 'rxjs';
import { AnalyticsService } from './../../../shared/services/analytics.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  data$: Observable<OverviewPage>;

  constructor(
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit() {
    this.data$ = this.analyticsService.getOverview();
  }

}
