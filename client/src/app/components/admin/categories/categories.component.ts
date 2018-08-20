import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../shared/interfaces';
import { CategoryService } from '../../../shared/services/category.service';
import { PositionService } from '../../../shared/services/position.service';
import { MaterialService } from '../../../shared/classes/material.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categories: Category[] = [];

  loader = true;

  constructor(
    private categoryService: CategoryService,
    private positionService: PositionService
  ) { }

  ngOnInit() {
    this.categoryService.fetch().subscribe(
      (infos: Category[]) => {
        this.categories = infos;
        console.log(this.categories);
        this.loader = false;
      },
      error => console.log(error)
    );

    // this.getPositions();

  }

  getPositions() {
    console.log(this.categories['_id']);
    this.positionService.fetch(this.categories['id']).subscribe(
      data => {
        console.log(data);
      },
      err => MaterialService.toast(err.error.message)
    );
  }

  ngOnDestroy(): void {
    // this.collapsInit.destroy();
  }

}
