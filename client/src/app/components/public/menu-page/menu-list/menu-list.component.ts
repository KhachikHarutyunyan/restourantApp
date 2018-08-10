import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../../../shared/classes/material.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('collaps') collapsRef: ElementRef;

  collapsInit: MaterialInstance;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.collapsInit = MaterialService.colaps(this.collapsRef);
  }

  ngOnDestroy(): void {
    this.collapsInit.destroy();
  }

}
