import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  links = [
    { url: '/admin', name: 'Overview', icon: 'visibility' },
    { url: '/admin/history', name: 'History', icon: 'history' },
    { url: '/admin/analytics', name: 'Analytics', icon: 'show_chart' },
    { url: '/admin/order', name: 'Order', icon: 'payment' },
    { url: '/admin/categories', name: 'Categories', icon: 'subject' }
  ];

  ngOnInit() {
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
