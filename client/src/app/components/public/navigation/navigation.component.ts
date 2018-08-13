import { Router } from '@angular/router';
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
  @ViewChild('cart') toggleCartRef: ElementRef;

  toggleMenuInit: MaterialInstance;
  toggleCartInit: MaterialInstance;
  menuState = false;
  cartState = false;
  showMenuStyle = '';

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      const user = this.auth.loadUserToken();
      console.log('user ', user);
    }
  }

  ngAfterViewInit() {
    this.toggleMenuInit = MaterialService.toggleMenu(this.toggleMenuRef);
    this.toggleCartInit = MaterialService.asideCart(this.toggleCartRef);
  }

  menuClick() {
    // this.menuState = true;
    // if (this.menuState) {
    //   this.toggleMenuInit.open();
    //   this.showMenuStyle = 'translateX(0%)!important;';
    // } else {
    //   this.toggleMenuInit.close();
    //   this.showMenuStyle = 'translateX(-105%)!important;';
    // }
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  cartClick() {
    if (this.cartState) {
      this.toggleCartInit.open();
      this.showMenuStyle = 'translateX(0%)!important;';
    } else {
      this.toggleCartInit.close();
      this.showMenuStyle = 'translateX(-105%)!important;';
    }
  }

  close() {
    this.toggleCartInit.close();
  }

  ngOnDestroy() {}

}
