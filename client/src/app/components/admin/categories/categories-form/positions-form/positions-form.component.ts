import { MaterialInstance, MaterialService } from './../../../../../shared/classes/material.service';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../../../node_modules/@angular/forms';
import { PositionService } from '../../../../../shared/services/position.service';
import { Positions } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string;
  @ViewChild('modal') modalRef: ElementRef;
  @ViewChild('deletemodal') deleteModalRef: ElementRef;

  form: FormGroup;

  modalInit: MaterialInstance;
  deleteModalInit: MaterialInstance;
  loading = false;
  positionId = null;
  positions: Positions[] = [];
  positionState = false;

  modalPosition;

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
    this.deleteModalInit = MaterialService.modal(this.deleteModalRef);
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ])],
      body: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)
      ])],
      cost: [1, Validators.compose([
        Validators.required,
        Validators.min(1)
      ])],
    });
  }

  onSelectPosition(position: Position) {
    this.positionId = position['_id'];
    this.positionState = false;
    this.form.patchValue({
      name: position['name'],
      body: position['body'],
      cost: position['cost']
    });
    this.modalInit.open();
    MaterialService.updateTextInput();
  }

  onAddPosition() {
    this.positionId = null;
    this.positionState = true;
    this.form.reset({
      name: null,
      body: null,
      cost: 1
    });
    this.modalInit.open();
    MaterialService.updateTextInput();
  }

  onClose() {
    this.modalInit.close();
  }

  onDeleteModal(event: Event, position: Position) {
    event.stopPropagation();
    this.deleteModalInit.open();
    this.modalPosition = position;
  }

  onDeletePosition() {
    this.positionService.delete(this.modalPosition).subscribe(
      response => {
        const index = this.positions.findIndex(p => p['_id'] === this.modalPosition._id);
        this.positions.splice(index, 1);
        MaterialService.toast(response.message);
      },
      err => MaterialService.toast(err.error.message)
    );
  }

  onSubmit() {
    this.form.disable();
    const newPosition: Positions = {
      name: this.form.value.name,
      body: this.form.value.body,
      cost: this.form.value.cost,
      category: this.categoryId
    };

    const complated = () => {
      this.form.enable(),
      this.form.reset({ name: '', body: '', cost: 1 });
      this.modalInit.close();
    };

    if (this.positionId) {
      newPosition['_id'] = this.positionId;
      this.positionService.update(newPosition).subscribe(
        position => {
          const index = this.positions.findIndex(p => p['_id'] === position['_id']);
          this.positions[index] = position;
          MaterialService.toast('Changes saved');
        },
        err => {
          this.form.enable();
          MaterialService.toast(err.error.message);
        },
        complated
      );
    } else {
      this.positionService.create(newPosition).subscribe(
        position => {
          this.positions.push(position);
          MaterialService.toast('Position created');
        },
        err => {
          this.form.enable();
          MaterialService.toast(err.error.message);
        },
        complated
      );
    }

  }

  ngOnDestroy() {
    this.modalInit.destroy();
    this.deleteModalInit.destroy();
  }

}
