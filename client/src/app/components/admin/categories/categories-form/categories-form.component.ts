import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../../node_modules/@angular/forms';
import { Category } from '../../../../shared/interfaces';
import { Router, ActivatedRoute, Params } from '../../../../../../node_modules/@angular/router';
import { switchMap } from '../../../../../../node_modules/rxjs/operators';
import { CategoryService } from '../../../../shared/services/category.service';
import { MaterialService } from '../../../../shared/classes/material.service';
import { of } from '../../../../../../node_modules/rxjs';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef;
  form: FormGroup;

  isNew = true;
  category: Category;

  image: File;
  imagePreview = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.form.disable();

    this.route.params.pipe(switchMap((params: Params) => {
      if (params['id']) {
        this.isNew = false;
        return this.categoryService.getById(params['id']);
      }
      return of(null);
    })
    ).subscribe(
      (category: Category) => {
        if (category) {
          this.category = category;
          this.form.patchValue({
            title: category.title,
            body: category.body
          });
          this.imagePreview = category.imageSrc;
          MaterialService.updateTextInput();
        }
        this.form.enable();
      },
      err => {
        MaterialService.toast(err.error.message);
      }
    );
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)
      ])]
    });
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  createCategory() {
    let obs$;
    this.form.disable();
    if (this.isNew) {
      obs$ = this.categoryService.create(this.form.value, this.image);
    } else {
      obs$ = this.categoryService.update(this.category._id, this.form.value, this.image);
    }

    obs$.subscribe(
      category => {
        this.category = category;
        MaterialService.toast('Changes saved');
        this.form.enable();
      },
      err => {
        MaterialService.toast(err.error.message);
        this.form.enable();
      }
    );
  }



}
