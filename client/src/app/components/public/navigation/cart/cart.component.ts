import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { CartService } from '../../../../shared/services/cart.service';
import { OrderPosition } from '../../../../shared/interfaces';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('cart') toggleCartRef: ElementRef;
  @Input() ordersList: Array<any>;

  toggleCartInit: MaterialInstance;

  orders = [];
  price;

  constructor(
    public cart: CartService
  ) { }

  ngOnInit() {
    this.price = this.cart.priceToken;
  }

  ngAfterViewInit() {
    this.toggleCartInit = MaterialService.asideCart(this.toggleCartRef);
    // this.cart.getListToken();
    this.orders = this.cart.listToken;
  }

  close() {
    this.toggleCartInit.close();
  }

  removeOrder(orders: OrderPosition) {
    this.cart.remove(orders);
    this.orders = this.cart.listToken;
    console.log(this.orders);
  }

  ngOnDestroy() {
    this.toggleCartInit.destroy();
  }

}
