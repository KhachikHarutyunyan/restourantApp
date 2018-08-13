import { AdminGuard } from './../../shared/services/admin.guard';
import { NgModule } from '../../../../node_modules/@angular/core';
import { CommonModule } from '../../../../node_modules/@angular/common';

import { AdminRoutingModule } from './admin.routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { AdminLayoutComponent } from '../../shared/layouts/admin-layout/admin-layout.component';
import { OverviewComponent } from './overview/overview.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    CategoriesComponent,
    AdminLayoutComponent,
    OverviewComponent
  ],
  providers: [AdminGuard]
})

export class AdminModule {}
