import { UserOrder } from './../../../shared/interfaces';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../../shared/classes/material.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../../shared/services/cart.service';
import { OrderPosition } from '../../../shared/interfaces';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { element } from 'protractor';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {

  form: FormGroup;

  @ViewChild('checkoutParallax') parallaxRef: ElementRef;
  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  parallaxInit: MaterialInstance;

  delivery;
  orders = [];
  checkState = false;

  unSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public cart: CartService,
    private auth: AuthService,
    private cd: ChangeDetectorRef
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
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
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

  cardValidator(controls) {
    const regExp = new RegExp(/^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {
        'nameValidator': true
      };
    }
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

  async onSubmit() {
    this.form.disable();
    this.checkState = true;
    const userOrder: UserOrder =  {
      name: this.form.value.name,
      surname: this.form.value.surname,
      telephon: this.form.value.telephon,
      street: this.form.value.street,
      payment: this.form.value.radio,
      orders: this.orders
    };

    const { token, error } = await stripe.createToken(this.card);

    if (this.auth.isLoggedIn()) {
      userOrder.userId = this.auth.userToken._id;
    }

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
        this.checkState = false;
        this.form.enable();
      }
    );
  }

  removeOrder(orders: OrderPosition) {
    this.cart.remove(orders);
    this.orders = this.cart.listToken;
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.parallaxInit.destroy();
    if (this.unSub) {
      this.unSub.unsubscribe();
    }

    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }


}
