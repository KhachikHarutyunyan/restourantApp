import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MaterialService, MaterialInstance } from '../../../shared/classes/material.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('slider') sliderRef: ElementRef;
  @ViewChild('parallax') parallaxRef: ElementRef;

  sliderInit: MaterialInstance;
  parallaxInit: MaterialInstance;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.sliderInit = MaterialService.slider(this.sliderRef);
    this.autoplay();
    this.parallaxInit = MaterialService.parallax(this.parallaxRef);
  }

  autoplay() {
    setTimeout(() => {
      this.sliderInit.next();
      this.autoplay();
    }, 5500);
  }

  ngOnDestroy() {
    this.sliderInit.destroy();
    this.parallaxInit.destroy();
  }

}
