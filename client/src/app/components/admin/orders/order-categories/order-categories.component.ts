import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Category } from './../../../../shared/interfaces';
import { CategoryService } from './../../../../shared/services/category.service';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss']
})
export class OrderCategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.fetch().subscribe(data => {
      this.categories = data;
    });
  }

}
