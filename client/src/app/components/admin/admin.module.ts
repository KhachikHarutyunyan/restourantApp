import { NgModule } from '../../../../node_modules/@angular/core';
import { CommonModule } from '../../../../node_modules/@angular/common';

import { AdminRoutingModule } from './admin.routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { AdminLayoutComponent } from '../../shared/layouts/admin-layout/admin-layout.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    CategoriesComponent,
    AdminLayoutComponent
  ]
})

export class AdminModule {}
