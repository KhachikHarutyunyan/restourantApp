import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { AdminGuard } from './../../shared/services/admin.guard';
import { NgModule } from '../../../../node_modules/@angular/core';
import { CommonModule } from '../../../../node_modules/@angular/common';

import { AdminRoutingModule } from './admin.routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { AdminLayoutComponent } from '../../shared/layouts/admin-layout/admin-layout.component';
import { OverviewComponent } from './overview/overview.component';
import { ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { CategoryService } from '../../shared/services/category.service';
import { PositionsFormComponent } from './categories/categories-form/positions-form/positions-form.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    CategoriesComponent,
    AdminLayoutComponent,
    OverviewComponent,
    CategoriesFormComponent,
    PositionsFormComponent
  ],
  providers: [AdminGuard, CategoryService]
})

export class AdminModule {}
