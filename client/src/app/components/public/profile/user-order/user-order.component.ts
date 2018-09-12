import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { UserOrder } from 'src/app/shared/interfaces';

const STEP = 2;

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss']
})
export class UserOrderComponent implements OnInit, OnDestroy {

  limit = STEP;
  offset = 0;
  unSub: Subscription;
  userId: string;

  usersOrders: UserOrder[] = [];
  loading = false;
  reloading = false;
  noMoreOrders = false;

  constructor(
    private cart: CartService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.userId = this.auth.userToken._id;
    this.reloading = true;
    this.setCheckout();
  }

  private setCheckout() {
    const params = Object.assign({}, {
      offset: this.offset,
      limit: this.limit
    });

    this.unSub = this.cart.getAllUserCheckouts(this.userId, params).subscribe(
        orders => {
          this.usersOrders = this.usersOrders.concat(orders);
          this.noMoreOrders = orders.length < STEP;
          this.loading = false;
          this.reloading = false;
        }
      );
  }

  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.setCheckout();
  }

  ngOnDestroy() {
    if (this.unSub) {
      this.unSub.unsubscribe();
    }
  }

}
