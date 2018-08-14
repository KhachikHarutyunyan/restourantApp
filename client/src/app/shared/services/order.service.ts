import { Injectable } from '../../../../node_modules/@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Order } from '../interfaces';


@Injectable({
  providedIn: 'root'
})

export class OrderService {

  orders: Order[] = [];
  price = 0;

  constructor(
    private http: HttpClient
  ) {}

  createOrder() {
    //
  }

}
