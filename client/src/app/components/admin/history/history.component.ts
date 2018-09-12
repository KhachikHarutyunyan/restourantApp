import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../../shared/classes/material.service';
import { Subscription } from 'rxjs';
import { Order, Filter, UserOrder } from '../../../shared/interfaces';
import { OrdersService } from '../../../shared/services/orders.service';
import { CartService } from '../../../shared/services/cart.service';


const STEP = 2;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  isFilterVisible = false;
  onSub: Subscription;
  orders: Order[] = [];
  usersOrders: UserOrder[] = [];
  loading = false;
  reloading = false;

  offset = 0;
  limit = STEP;
  noMoreOrders = false;
  filter: Filter = {};

  constructor(
    private ordersService: OrdersService,
  ) { }

  ngOnInit() {
    this.reloading = true;
    this.fetch();
  }

  private fetch() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    });

    this.onSub = this.ordersService.fetch(params).subscribe(orders => {
      this.orders = this.orders.concat(orders);
      this.noMoreOrders = orders.length < STEP;
      this.loading = false;
      this.reloading = false;
    });
  }

  applyFilter(filter: Filter) {
    this.orders = [];
    this.usersOrders = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.fetch();

  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.tooltip(this.tooltipRef);
  }

  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    this.onSub.unsubscribe();
  }

}
