import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../../../shared/classes/material.service';
import { CategoryService } from '../../../../shared/services/category.service';
import { Category, Positions } from '../../../../shared/interfaces';
import { PositionService } from '../../../../shared/services/position.service';
import { DomSanitizer } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    this.loader = true;
    this.categoryService.fetch().subscribe(data => {
      console.log(data);
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
    // RegExp.escape = function( text ) {
    //   return ( text + '' ).replace( /[.?*+^$[\]\\(){}|-]/g, '\\$&' );
    // };
    const s = 'The quick apifox/ jumped \ over \ the lazy dog.';
    const re = /[.?*+^$[\]\\(){}|-]/g;
    // Exchange each pair of words.
    const result = s.replace(re, '/');


    console.log(result);
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
    // console.log(loadedImage);
    // return loadedImage;
  }

  ngOnDestroy(): void {
    this.collapsInit.destroy();
  }

}
