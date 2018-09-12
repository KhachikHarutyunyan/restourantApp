import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { MaterialInstance, MaterialService } from '../../../shared/classes/material.service';
import { UserOrder, Filter } from '../../../shared/interfaces';
import { Subscription } from 'rxjs';

const STEP = 2;

@Component({
  selector: 'app-users-orders',
  templateUrl: './users-orders.component.html',
  styleUrls: ['./users-orders.component.scss']
})
export class UsersOrdersComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  isFilterVisible = false;
  onSub: Subscription;
  usersOrders: UserOrder[] = [];
  loading = false;
  reloading = false;

  offset = 0;
  limit = STEP;
  noMoreOrders = false;
  filter: Filter = {};

  constructor(
    private cart: CartService
  ) { }

  ngOnInit() {
    this.reloading = true;
    this.setCheckout();
  }

  private setCheckout() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    });

    this.onSub = this.cart.getAllCheckouts(params).subscribe(orders => {
      this.usersOrders = this.usersOrders.concat(orders);
      this.noMoreOrders = orders.length < STEP;
      this.loading = false;
      this.reloading = false;
    });
  }

  applyFilter(filter: Filter) {
    this.usersOrders = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.setCheckout();

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
    this.setCheckout();
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    this.onSub.unsubscribe();
  }

}
