import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { CartService } from '../../../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('cart') toggleCartRef: ElementRef;

  toggleCartInit: MaterialInstance;

  constructor(
    public cart: CartService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.toggleCartInit = MaterialService.asideCart(this.toggleCartRef);
  }

  close() {
    this.toggleCartInit.close();
  }

  ngOnDestroy() {
    this.toggleCartInit.destroy();
  }

}
