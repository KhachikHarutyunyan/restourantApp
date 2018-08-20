import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AdminLayoutComponent } from '../../shared/layouts/admin-layout/admin-layout.component';
import { AdminGuard } from '../../shared/services/admin.guard';
import { OverviewComponent } from './overview/overview.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', component: AdminLayoutComponent, canActivateChild: [AdminGuard], children: [
    { path: '', component: OverviewComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'categories/new', component: CategoriesFormComponent },
    { path: 'categories/:id', component: CategoriesFormComponent },
    { path: 'orders', component: OrdersComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {}
