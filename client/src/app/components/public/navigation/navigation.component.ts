import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../../shared/classes/material.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('toggleMenu') toggleMenuRef: ElementRef;

  toggleMenuInit: MaterialInstance;
  menuState = false;
  showMenuStyle = '';

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.toggleMenuInit = MaterialService.toggleMenu(this.toggleMenuRef);
  }

  menuClick() {
    // this.menuState = true;
    if (this.menuState) {
      this.toggleMenuInit.open();
      this.showMenuStyle = 'translateX(0%)!important;';
    } else {
      this.toggleMenuInit.close();
      this.showMenuStyle = 'translateX(-105%)!important;';
    }
  }

  ngOnDestroy() {}

}
