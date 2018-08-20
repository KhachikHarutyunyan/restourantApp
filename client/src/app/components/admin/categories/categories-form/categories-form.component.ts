import { MaterialInstance } from '../../../../shared/classes/material.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Category } from '../../../../shared/interfaces';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CategoryService } from '../../../../shared/services/category.service';
import { MaterialService } from '../../../../shared/classes/material.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  @ViewChild('input') inputRef: ElementRef;
  @ViewChild('modal') modalRef: ElementRef;

  modalInit: MaterialInstance;
  isNew = true;
  image: File;
  imagePreview = '';
  category: Category;

  isFileLoaded;

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


    this.route.params.pipe(switchMap((params: Params) => {
      if (params['id']) {
        this.isNew = false;
        this.isFileLoaded = true;
        return this.categoryServices.getById(params['id']);
      }
      this.isFileLoaded = false;
      return of(null);
    })).subscribe(
      (category: Category) => {
        if (category) {
          this.category = category;
          this.form.patchValue({
            category: category.name,
            name: category.category[0].title
          });
          this.imagePreview = category.category[0]['imageSrc'];
          MaterialService.updateTextInput();
        }
        this.form.enable();
      },
      err => {
        MaterialService.toast(err.error.message);
      }
    );
  }

  ngAfterViewInit() {
    this.modalInit = MaterialService.modal(this.modalRef);
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
    if (this.image !== undefined) {
      this.isFileLoaded = true;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  deleteCategory() {
      this.categoryServices.delete(this.category['_id']).subscribe(
        response => {
          MaterialService.toast(response.message);
        },
        err => {
          MaterialService.toast(err.error.message);
        },
        () => {
          this.router.navigate(['/admin/categories']);
        }
      );
  }

  onSubmit() {
    let obs$;
    const formData = { name: this.form.value.category, title: this.form.value.name };
    this.form.disable();
    if (this.isNew) {
      obs$ = this.categoryServices.create(formData, this.image);
    } else {
      obs$ = this.categoryServices.update(this.category._id, formData, this.image);
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
