import { MaterialInstance } from './../../../../shared/classes/material.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '../../../../../../node_modules/@angular/forms';
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

  form: FormGroup;
  @ViewChild('input') inputRef: ElementRef;
  isNew = true;
  image: File;
  imagePreview = '';
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryServices: CategoryService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {

    this.form.disable();

    // this.categoryServices.fetch

    this.route.params.pipe(switchMap((params: Params) => {
      if (params['id']) {
        this.isNew = false;
        return this.categoryServices.getById(params['id']);
      }

      return of(null);
    })).subscribe(
      (category: Category) => {
        if (category) {
          this.category = category;
          this.form.patchValue({
            name: category.name
          });
          this.imagePreview = category.category['imageSrc'];
          MaterialService.updateTextInput();
        }
        this.form.enable();
      },
      err => MaterialService.toast(err.error.message)
    );
  }

  createForm() {
    this.form = this.formBuilder.group({
      category: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ])],
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])]
    });
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
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

  deleteCategory() {
    const decision = window.confirm(`Вы уверенны, чтр хотите удалить категорию "${this.category.name}"`);
    if (decision) {
      this.categoryServices.delete(this.category['_id']).subscribe(
        response => {
          MaterialService.toast(response.message);
        },
        err => {
          MaterialService.toast(err.error.message);
        },
        () => {
          this.router.navigate(['/categories']);
        }
      );
    }
  }

  createCategory() {
    let obs$;
    this.form.disable();
    if (this.isNew) {
      obs$ = this.categoryServices.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoryServices.update(this.category['_id'], this.form.value.name, this.image);
    }

    obs$.subscribe(
      category => {
        this.category = category;
        MaterialService.toast('Изменения сохранены');
        this.form.enable();
      },
      err => {
        MaterialService.toast(err.error.message);
        this.form.enable();
      }
    );

  }

}
