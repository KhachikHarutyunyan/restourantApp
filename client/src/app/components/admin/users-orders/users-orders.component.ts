import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { MaterialInstance, MaterialService } from '../../../shared/classes/material.service';
import { UserOrder, Filter } from '../../../shared/interfaces';

const STEP = 2;

@Component({
  selector: 'app-users-orders',
  templateUrl: './users-orders.component.html',
  styleUrls: ['./users-orders.component.scss']
})
export class UsersOrdersComponent implements OnInit, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef;
  // tslint:disable-next-line:no-input-rename
  @Input('userOrder') orders: UserOrder[];

  modalInit: MaterialInstance;

  offset = 0;
  limit = STEP;
  filter: Filter = {};

  constructor(
    private cart: CartService
  ) { }

  ngOnInit() {
    this.cart.getAllCheckouts().subscribe(
      data => {
        console.log('user orders',  this.orders);
      }
    );
  }

  ngAfterViewInit() {
    this.modalInit = MaterialService.modal(this.modalRef);
  }

}
