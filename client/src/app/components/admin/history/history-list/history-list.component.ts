import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Order } from '../../../../shared/interfaces';
import { MaterialInstance, MaterialService } from '../../../../shared/classes/material.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() orders: Order[];
  @ViewChild('modal') modalRef: ElementRef;

  modalInit: MaterialInstance;
  selectedOrder: Order;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.modalInit = MaterialService.modal(this.modalRef);
  }

  computePrice(order: Order): number {
    return order.list.reduce((total, item) => {
      return total += item.quantity * item.cost;
    }, 0);
  }

  selectOrder(order: Order) {
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
