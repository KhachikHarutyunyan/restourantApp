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

  constructor(
    private http: HttpClient
  ) { }

  addPosition(position: Positions) {
    // if (!!this.listToken) {
    //   const parse = JSON.parse(this.listToken);
    //   this.list = parse;
    //   console.log('mojno', this.listToken);
    //   this.getListToken();
    // } else {
    //   this.list = [];
    //   console.log('nelzya', this.listToken);
    // }

    const orderPosition: OrderPosition = Object.assign({}, {
      name: position['name'],
      cost: position['cost'],
      quantity: position['quantity'],
      _id: position['_id']
    });

    const potentialOrder = this.list.find(p => p._id === orderPosition._id);
    if (potentialOrder) {
      potentialOrder.quantity += orderPosition.quantity;
      console.log('potential');
    } else {
      this.list.push(orderPosition);
      // this.list.push(orderPosition);
      localStorage.setItem('orderList', JSON.stringify(this.list));
      console.log('list.push');
    }

    // if (!this.listToken) {

    //   this.setListToken();
    // } else {
    //   console.log('nelzya');
    //   this.list = JSON.parse(this.listToken);
    //   localStorage.setItem('orderList', JSON.stringify(this.list));
    // }


    // localStorage.setItem('orderList', JSON.stringify(this.list));
    console.log(this.listToken);
    console.log(JSON.parse(this.listToken));
    console.log(this.list);

    this.calculatePrice();
    this.getPriceToken();
    this.getListToken();

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
    localStorage.removeItem('price');
  }

  private calculatePrice() {
    this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost;
    }, 0);
    localStorage.setItem('price', JSON.stringify(this.price));
    // this.setPriceToken();
  }

  getPriceToken() {
    this.priceToken = localStorage.getItem('price');
    return this.priceToken;
  }

  getListToken() {
    this.listToken = localStorage.getItem('orderList');
    return this.listToken;
  }

}
