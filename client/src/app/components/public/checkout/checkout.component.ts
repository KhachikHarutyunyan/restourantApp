import { UserOrder } from './../../../shared/interfaces';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../../shared/classes/material.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../../shared/services/cart.service';
import { OrderPosition } from '../../../shared/interfaces';
import { Subscription } from 'rxjs';

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

  unSub: Subscription;

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
        Validators.maxLength(30),
        this.nameValidator
      ])],
      surname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        this.nameValidator
      ])],
      telephon: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.phoneValidator
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        this.emailValidator
      ])],
      street: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        this.streetValidator
      ])],
      radio: ['cart', Validators.compose([
        Validators.required
      ])]
    });
  }

  nameValidator(controls) {
    const regExp = new RegExp(/^[a-zA-Z]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'nameValidator': true
      };
    }
  }

  emailValidator(controls) {
    // tslint:disable-next-line:max-line-length
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'emailValidator': true
      };
    }
  }


  streetValidator(controls) {
    // tslint:disable-next-line:max-line-length
    // const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const regExp = new RegExp(/^[a-zA-Z0-9\s,.'-]{3,}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'emailValidator': true
      };
    }
  }

  phoneValidator(controls) {
    const regExp = new RegExp(/^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'phoneValidator': true
      };
    }
  }

  onSubmit() {
    this.form.disable();
    const userOrder: UserOrder =  {
      name: this.form.value.name,
      surname: this.form.value.surname,
      telephon: this.form.value.telephon,
      email: this.form.value.email,
      street: this.form.value.street,
      payment: this.form.value.radio,
      orders: this.orders
    };

    this.unSub = this.cart.createCheckout(userOrder).subscribe(
      data => {
        MaterialService.toast('Thank you for order');
        this.cart.clear();
        this.orders = [];
        this.form.enable();
        this.form.reset();
      },
      err => {
        MaterialService.toast(err.error.message);
        this.form.enable();
      }
    );
  }

  removeOrder(orders: OrderPosition) {
    this.cart.remove(orders);
    this.orders = this.cart.listToken;
  }

  ngOnDestroy() {
    this.parallaxInit.destroy();
    if (this.unSub) {
      this.unSub.unsubscribe();
    }
  }

}
