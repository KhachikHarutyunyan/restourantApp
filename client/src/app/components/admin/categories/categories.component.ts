import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from '../../../../../node_modules/rxjs';
import { Category } from '../../../shared/interfaces';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categories: Category[] = [];

  loader = true;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    // this.loader = true;
    this.categoryService.fetch().subscribe(
      (infos: Category[]) => {
        this.categories = infos;
        console.log(this.categories);
        this.loader = false;
      },
      error => console.log(error)
    );

  }

  ngOnDestroy(): void {
    // this.collapsInit.destroy();
  }

}
