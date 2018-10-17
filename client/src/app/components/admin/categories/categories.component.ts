import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/interfaces';
import { CategoryService } from '../../../shared/services/category.service';
import { PositionService } from '../../../shared/services/position.service';
import { MaterialService } from '../../../shared/classes/material.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

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
        this.loader = false;
      },
      error => console.log(error)
    );

  }

  getPositions() {
    this.positionService.fetch(this.categories['id']).subscribe(
      data => {
      },
      err => MaterialService.toast(err.error.message)
    );
  }

}
