import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../../shared/classes/material.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, AfterViewInit, OnDestroy {

  // @ViewChild('collaps') collapsRef: ElementRef;
  // @ViewChild('collapsDrink') drinkcollapsRef: ElementRef;

  // collapsInit: MaterialInstance;
  // drinkcollapsInit: MaterialInstance;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.collapsInit = MaterialService.colaps(this.collapsRef);
    // this.drinkcollapsInit = MaterialService.colaps(this.drinkcollapsRef);
  }

  ngOnDestroy(): void {
    // this.collapsInit.destroy();
  }

}
