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
  checkout = false;

  offset = 0;
  limit = STEP;
  noMoreOrders = false;
  filter: Filter = {};

  constructor(
    private ordersService: OrdersService,
    private cart: CartService
  ) { }

  ngOnInit() {
    this.reloading = true;
    this.fetch();
    // this.setCheckout();
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

  setCheckout() {
    this.checkout = !this.checkout;
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    });

    if (this.checkout) {
      console.log('checkout state', this.checkout);
      this.offset = STEP;
      this.cart.getAllCheckouts(params).subscribe(
        data => {
          this.usersOrders = this.usersOrders.concat(data);
          this.noMoreOrders = this.usersOrders.length < STEP;
          this.loading = false;
          this.reloading = false;
          console.log(data);
        }
      );
    } else {
      console.log('checkout else', this.checkout);
    }
  }

  applyFilter(filter: Filter) {
    this.orders = [];
    this.usersOrders = [];
    this.offset = 0;
    this.filter = filter;
    if (this.checkout) {
      this.setCheckout();
    } else {
      this.reloading = true;
      this.fetch();
    }

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
    if (this.checkout) {
      this.setCheckout();
    } else {
      this.fetch();
    }
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    this.onSub.unsubscribe();
  }

}
