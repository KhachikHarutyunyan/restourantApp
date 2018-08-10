import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../../shared/classes/material.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('aboutParallax') aboutParallaxRef: ElementRef;

  aboutParallaxInit: MaterialInstance;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.aboutParallaxInit = MaterialService.parallax(this.aboutParallaxRef);
  }

  ngOnDestroy() {
    this.aboutParallaxInit.destroy();
  }

}
