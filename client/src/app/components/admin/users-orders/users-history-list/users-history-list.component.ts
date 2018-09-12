import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { UserOrder } from 'src/app/shared/interfaces';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-users-history-list',
  templateUrl: './users-history-list.component.html',
  styleUrls: ['./users-history-list.component.scss']
})
export class UsersHistoryListComponent implements OnInit, AfterViewInit, OnDestroy {

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
