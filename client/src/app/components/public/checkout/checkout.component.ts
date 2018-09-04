import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../../shared/classes/material.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../../shared/services/cart.service';
import { OrderPosition } from '../../../shared/interfaces';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {

  form: FormGroup;

  @ViewChild('checkoutParallax') parallaxRef: ElementRef;

  parallaxInit: MaterialInstance;

  delivery = 3;

  constructor(
    private formBuilder: FormBuilder,
    public cart: CartService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.cart.getListToken();
    this.cart.getPriceToken();
    this.delivery = this.cart.delivery;
  }

  ngAfterViewInit() {
    this.parallaxInit = MaterialService.parallax(this.parallaxRef);
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ])],
      surname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ])],
      telephon: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ])],
      street: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ])],
      radio: ['cart', Validators.compose([
        Validators.required
      ])]
    });
  }

  onSubmit() {
    console.log(this.form);
  }

  removeOrder(orders: OrderPosition) {
    this.cart.remove(orders);
    // this.cart.getPriceToken();
    // this.ordersList = this.cart.listToken;
    // this.price = this.cart.priceToken;
  }

  ngOnDestroy() {
    this.parallaxInit.destroy();
  }

}
