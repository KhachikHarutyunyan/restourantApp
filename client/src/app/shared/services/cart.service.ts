import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderPosition, Positions } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public price = 0;
  public list: OrderPosition[] = [];
  public priceToken: any = 0;

  constructor(
    private http: HttpClient
  ) { }

  addPosition(position: Positions) {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position['name'],
      cost: position['cost'],
      quantity: position['quantity'],
      _id: position['_id'],
    });

    const potentialOrder = this.list.find(p => p._id === orderPosition._id);
    if (potentialOrder) {
      potentialOrder.quantity += orderPosition.quantity;
    } else {
      this.list.push(orderPosition);
    }

    localStorage.setItem('orderList', JSON.stringify(this.list));

    this.calculatePrice();
  }

  remove(orderPosition: OrderPosition) {
    const index = this.list.findIndex(p => p._id === orderPosition._id);
    this.list.splice(index, 1);
    this.calculatePrice();
  }

  clear() {
    this.list = [];
    this.price = 0;
    localStorage.removeItem('orderList');
  }

  private calculatePrice() {
    this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost;
    }, 0);
    localStorage.setItem('price', JSON.stringify(this.price));
    this.setPriceToken();
  }

  setPriceToken() {
    this.priceToken = localStorage.getItem('price');
    return this.priceToken;
  }

}
