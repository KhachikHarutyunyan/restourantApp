import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../../shared/classes/material.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('userMenu') userMenuRef: ElementRef;

  userMenuInit: MaterialInstance;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.userMenuInit = MaterialService.toggleMenu(this.userMenuRef);
  }

  ngOnDestroy() {
    this.userMenuInit.destroy();
  }

}
