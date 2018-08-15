import { MaterialInstance, MaterialService } from './../../../../../shared/classes/material.service';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit {

  @Input('categoryId') categoryId: string;
  @ViewChild('modal') modalRef: ElementRef;

  modalInit: MaterialInstance;
  loading = false;
  positionId = null;

  constructor(

  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.modalInit = MaterialService.modal(this.modalRef);
  }

}
