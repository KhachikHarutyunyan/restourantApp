import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnalyticsService } from '../../../../shared/services/analytics.service';
import { AnalyticsPage } from 'src/app/shared/interfaces';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-users-analytics',
  templateUrl: './users-analytics.component.html',
  styleUrls: ['./users-analytics.component.scss']
})
export class UsersAnalyticsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('order') orderRef: ElementRef;

  average: number;
  pending = true;

  aSub: Subscription;

  constructor(
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const gainConfig: any = {
      label: 'Gain',
      color: 'rgb(255, 99, 132)'
    };

    const orderConfig: any = {
      label: 'Orders',
      color: 'rgb(54, 162, 235)'
    };

    this.aSub = this.analyticsService.getUserAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average;

      gainConfig.labels = data.chart.map(item => item.label);
      gainConfig.data = data.chart.map(item => item.gain);

      orderConfig.labels = data.chart.map(item => item.label);
      orderConfig.data = data.chart.map(item => item.order);

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      const orderCtx = this.orderRef.nativeElement.getContext('2d');
      gainCtx.canvas.height = '300px';
      orderCtx.canvas.height = '300px';

      // tslint:disable-next-line:no-unused-expression
      new Chart(gainCtx, createChartConfig(gainConfig));
      // tslint:disable-next-line:no-unused-expression
      new Chart(orderCtx, createChartConfig(orderConfig));

      this.pending = false;
    });

  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}

function createChartConfig({ labels, data, label, color }) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLines: false,
          fill: false
        }
      ]
    }
  };
}

