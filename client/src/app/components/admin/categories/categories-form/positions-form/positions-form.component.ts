import { MaterialInstance, MaterialService } from './../../../../../shared/classes/material.service';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../../../node_modules/@angular/forms';
import { PositionService } from '../../../../../shared/services/position.service';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit {

  @Input('categoryId') categoryId: string;
  @ViewChild('modal') modalRef: ElementRef;

  form: FormGroup;

  modalInit: MaterialInstance;
  loading = false;
  positionId = null;
  positions: Position[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private positionService: PositionService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loading = true;
    this.positionService.fetch(this.categoryId).subscribe((positions) => {
      this.positions = positions;
      this.loading = false;
    });
  }

  ngAfterViewInit() {
    this.modalInit = MaterialService.modal(this.modalRef);
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)
      ])],
      cost: [1, Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])],
    });
  }

  onSelectPosition(position: Position) {
    // this.positionId = position._id;
  }

  onSubmit() {}



}
