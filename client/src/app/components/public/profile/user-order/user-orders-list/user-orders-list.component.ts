import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { UserOrder } from '../../../../../shared/interfaces';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-user-orders-list',
  templateUrl: './user-orders-list.component.html',
  styleUrls: ['./user-orders-list.component.scss']
})
export class UserOrdersListComponent implements OnInit, OnDestroy, AfterViewInit {

  // tslint:disable-next-line:no-input-rename
  @Input('userOrder') orders: UserOrder[];
  @ViewChild('modal') modalRef: ElementRef;

  modalInit: MaterialInstance;
  selectedOrder: UserOrder;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.modalInit = MaterialService.modal(this.modalRef);
  }

  computePrice(order: UserOrder): number {
    return order.orders.reduce((total, item) => {
      return total += item.quantity * item.cost;
    }, 0);
  }

  selectOrder(order: UserOrder) {
    this.selectedOrder = order;
    this.modalInit.open();
  }

  closeModal() {
    this.modalInit.close();
  }

  ngOnDestroy() {
    this.modalInit.destroy();
  }

}
