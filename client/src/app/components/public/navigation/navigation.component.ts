import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../../shared/classes/material.service';
import { AuthService } from '../../../shared/services/auth.service';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('toggleMenu') toggleMenuRef: ElementRef;

  toggleMenuInit: MaterialInstance;

  constructor(
    public auth: AuthService,
    private router: Router,
    public cart: CartService
  ) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      const user = this.auth.loadUserToken();
    }
  }

  ngAfterViewInit() {
    this.toggleMenuInit = MaterialService.toggleMenu(this.toggleMenuRef);
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.toggleMenuInit.destroy();
  }

}
