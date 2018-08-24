import { OverviewPage } from './../../../shared/interfaces';
import { Observable } from 'rxjs';
import { AnalyticsService } from './../../../shared/services/analytics.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../../shared/classes/material.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tapTarget') tapTargetRef: ElementRef;

  tapTargetInit: MaterialInstance;
  data$: Observable<OverviewPage>;

  yesterday = new Date();

  constructor(
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit() {
    this.data$ = this.analyticsService.getOverview();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  ngAfterViewInit() {
    this.tapTargetInit = MaterialService.initTapTarget(this.tapTargetRef);
  }

  openInfo() {
    this.tapTargetInit.open();
  }

  ngOnDestroy() {
    this.tapTargetInit.close();
  }

}
