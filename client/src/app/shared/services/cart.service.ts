import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderPosition, Positions } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public price = 0;
  public list: OrderPosition[] = [];
  public priceToken = null;
  public listToken = null;
  public delivery = 3;

  constructor(
    private http: HttpClient
  ) { }

  addPosition(position: Positions) {

    const orderPosition: OrderPosition = Object.assign({}, {
      name: position['name'],
      cost: position['cost'],
      quantity: position['quantity'],
      _id: position['_id']
    });

    this.getPriceToken();
    const potentialOrder = this.list.find(p => p._id === orderPosition._id);

    if (potentialOrder) {
      potentialOrder.quantity += orderPosition.quantity;
      localStorage.setItem('orderList', JSON.stringify(this.list));
    } else {
      if (this.priceToken === null) {
        this.list.push(orderPosition);
        localStorage.setItem('orderList', JSON.stringify(this.list));
      } else {
        this.getListToken();
        this.list = this.listToken;
        this.list.push(orderPosition);
        localStorage.setItem('orderList', JSON.stringify(this.list));
      }
    }


    this.getPriceToken();
    this.getListToken();
    this.calculatePrice();

  }

  remove(orderPosition: OrderPosition) {
    this.getListToken();
    if (this.listToken !== null) {
      this.list = this.listToken;
    }
    const index = this.list.findIndex(p => p._id === orderPosition._id);
    this.list.splice(index, 1);
    localStorage.setItem('orderList', JSON.stringify(this.list));
    this.calculatePrice();
  }

  clear() {
    this.list = [];
    this.price = 0;
    localStorage.removeItem('orderList');
    localStorage.removeItem('price');
    this.getPriceToken();
  }

  private calculatePrice() {
    this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost;
    }, 0);
    localStorage.setItem('price', JSON.stringify(this.price));
    this.getPriceToken();
  }

  getPriceToken() {
    this.priceToken = JSON.parse(localStorage.getItem('price'));
    return this.priceToken;
  }

  getListToken() {
    this.listToken = JSON.parse(localStorage.getItem('orderList'));
    return this.listToken;
  }

}
