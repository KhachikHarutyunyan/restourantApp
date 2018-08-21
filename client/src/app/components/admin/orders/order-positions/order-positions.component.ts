import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../../../shared/services/position.service';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../order.service';
import { Observable } from 'rxjs';
import { Positions } from '../../../../shared/interfaces';
import { switchMap, map } from 'rxjs/operators';
import { MaterialService } from '../../../../shared/classes/material.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Positions[]>;

  constructor(
    private positionService: PositionService,
    private route: ActivatedRoute,
    private order: OrderService
  ) { }

  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      switchMap(
        (params: Params) => {
          return this.positionService.fetch(params['id']);
        }
      ),
      map(
        (positions: Positions[]) => {
          return positions.map(position => {
            position.quantity = 1;
            return position;
          });
        }
      )
    );
  }

  addToOrder(position: Positions) {
    this.order.add(position);
    MaterialService.toast(`Added *${position.quantity}`);
  }

  onBlur(event) {
    if (event.target.value < 1) {
      MaterialService.toast('Count must be more 0');
      event.target.value = 1;
    }
  }

}
