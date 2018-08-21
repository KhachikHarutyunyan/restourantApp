import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../../shared/classes/material.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { OrdersService } from '../../../shared/services/orders.service';
import { OrderService } from './order.service';
import { Order, OrderPosition } from '../../../shared/interfaces';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef;

  isRoot: boolean;
  modalInit: MaterialInstance;
  osub: Subscription;
  pending = false;

  constructor(
    private router: Router,
    private ordersService: OrdersService,
    public order: OrderService
  ) { }

  ngOnInit() {
    this.isRoot = this.router.url === '/admin/orders';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/admin/orders';
      }
    });
  }

  ngAfterViewInit() {
    this.modalInit = MaterialService.modal(this.modalRef);
  }

  open() {
    this.modalInit.open();
  }

  cancel() {
    this.modalInit.close();
  }

  submit() {
    this.pending = true;
    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id;
        return item;
      })
    };
    this.osub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Order N${newOrder.order} was added.`);
        this.order.clear();
      },
      err => MaterialService.toast(err.error.message),
      () => {
        this.pending = false;
        this.modalInit.close();
      }
    );
  }

  deletePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition);
  }

  ngOnDestroy() {
    this.modalInit.destroy();
    if (this.osub) {
      this.osub.unsubscribe();
    }
  }

}
