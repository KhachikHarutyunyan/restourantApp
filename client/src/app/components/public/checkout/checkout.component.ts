import { UserOrder } from './../../../shared/interfaces';
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

  delivery;
  orders = [];

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
    if (this.cart.listToken === null) {
      this.orders = [];
    } else {
      this.orders = this.cart.listToken;
    }
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
    const userOrder: UserOrder =  {
      name: this.form.value.name,
      surname: this.form.value.surname,
      telephon: this.form.value.telephon,
      email: this.form.value.email,
      street: this.form.value.street,
      paiment: this.form.value.radio,
      orders: this.orders
    };
    console.log(userOrder);

    this.cart.clear();
    this.orders = [];
  }

  removeOrder(orders: OrderPosition) {
    this.cart.remove(orders);
    this.orders = this.cart.listToken;
  }

  ngOnDestroy() {
    this.parallaxInit.destroy();
  }

}
