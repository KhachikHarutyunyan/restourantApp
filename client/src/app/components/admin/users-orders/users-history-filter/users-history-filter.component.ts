import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Filter } from 'src/app/shared/interfaces';
import { MaterialDatepicker, MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-users-history-filter',
  templateUrl: './users-history-filter.component.html',
  styleUrls: ['./users-history-filter.component.scss']
})
export class UsersHistoryFilterComponent implements OnInit, AfterViewInit, OnDestroy {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFilter = new EventEmitter<Filter>();
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;

  order: number;
  start: MaterialDatepicker;
  end: MaterialDatepicker;

  isValid = true;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.start = MaterialService.initDatePicker(this.startRef, this.validate.bind(this));
    this.end = MaterialService.initDatePicker(this.endRef, this.validate.bind(this));
  }

  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }

    this.isValid = this.start.date < this.end.date;
  }

  submitFilter() {
    const filter: Filter = {};
    if (this.order) {
      filter.order = this.order;
    }

    if (this.start.date) {
      filter.start = this.start.date;
    }

    if (this.end.date) {
      filter.end = this.end.date;
    }

    this.onFilter.emit(filter);
  }

  onBlur(event: Event) {
    if (event.target['value'] < 1) {
      this.order = 1;
      MaterialService.toast('Order Number must be more 0!');
      MaterialService.updateTextInput();
    }
  }

  ngOnDestroy() {
    this.start.destroy();
    this.end.destroy();
  }

}
