import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../../../shared/classes/material.service';
import { CategoryService } from '../../../../shared/services/category.service';
import { Category, Positions } from '../../../../shared/interfaces';
import { PositionService } from '../../../../shared/services/position.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from '../../../../shared/services/cart.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('collaps') collapsRef: ElementRef;

  loader = true;
  progress = false;

  newId;

  collapsInit: MaterialInstance;

  categories: Category[] = [];
  position: Positions[] = [];

  constructor(
    private positionService: PositionService,
    private categoryService: CategoryService,
    private sanitizer: DomSanitizer,
    private cart: CartService
  ) {

  }

  ngOnInit() {
    this.loader = true;
    this.categoryService.fetch().subscribe(data => {
      if (data.length !== 0) {
        this.categories = data;
        this.loader = false;
      } else {
        MaterialService.toast('No menu data!');
        this.loader = false;
      }
    });
  }

  ngAfterViewInit() {
    this.collapsInit = MaterialService.colaps(this.collapsRef);
  }

  menuCategory(id) {
    this.progress = true;
    if (id !== this.newId) {
      this.positionService.fetch(id).subscribe(data => {
        if (data.length !== 0) {
          this.position = data;
          this.progress = false;
        } else {
          MaterialService.toast('No category!');
          this.progress = false;
        }

      });
    } else {
      this.progress = false;
      return;
    }
    this.newId = id;

  }

  onImageLoaded(image: string) {
    const re = /[\\]/g;
    const result = image.replace(re, '/');
    return this.sanitizer.bypassSecurityTrustStyle(`url(${result})`);
  }

  addToCart(position: Positions) {
    // console.log(position);
    this.cart.addPosition(position);
  }

  ngOnDestroy(): void {
    this.collapsInit.destroy();
  }

}
