import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../../../shared/classes/material.service';
import { CategoryService } from '../../../../shared/services/category.service';
import { Category, Positions } from '../../../../shared/interfaces';
import { PositionService } from '../../../../shared/services/position.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('collaps') collapsRef: ElementRef;

  collapsInit: MaterialInstance;

  categories: Category[] = [];
  position: Positions[] = [];

  constructor(
    private positionService: PositionService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.fetch().subscribe(data => {
      this.categories = data;

    });
  }

  ngAfterViewInit() {
    this.collapsInit = MaterialService.colaps(this.collapsRef);
  }

  menuCategory(id) {
    this.positionService.fetch(id).subscribe(data => {
      this.position = data;
    });

  }

  ngOnDestroy(): void {
    this.collapsInit.destroy();
  }

}
