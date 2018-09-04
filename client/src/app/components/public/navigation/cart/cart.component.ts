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
  @Input() price: number;

  toggleCartInit: MaterialInstance;
  delivery = this.cart.delivery;

  constructor(
    public cart: CartService
  ) { }

  ngOnInit() {
    this.delivery = this.cart.delivery;
  }

  ngAfterViewInit() {
    this.toggleCartInit = MaterialService.asideCart(this.toggleCartRef);
    this.cart.getListToken();
  }

  close() {
    this.toggleCartInit.close();
  }

  removeOrder(orders: OrderPosition) {
    this.cart.remove(orders);
    this.ordersList = this.cart.listToken;
    this.price = this.cart.priceToken;
  }

  ngOnDestroy() {
    this.toggleCartInit.destroy();
  }

}
