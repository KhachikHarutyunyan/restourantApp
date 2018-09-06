import { OrderCategoriesComponent } from './orders/order-categories/order-categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AdminLayoutComponent } from '../../shared/layouts/admin-layout/admin-layout.component';
import { AdminGuard } from '../../shared/services/admin.guard';
import { OverviewComponent } from './overview/overview.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderPositionsComponent } from './orders/order-positions/order-positions.component';
import { HistoryComponent } from './history/history.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { UsersOrdersComponent } from './users-orders/users-orders.component';

const routes: Routes = [
  { path: '', component: AdminLayoutComponent, canActivateChild: [AdminGuard], children: [
    { path: '', component: OverviewComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'categories/new', component: CategoriesFormComponent },
    { path: 'categories/:id', component: CategoriesFormComponent },
    { path: 'orders', component: OrdersComponent, children: [
      { path: '', component: OrderCategoriesComponent },
      { path: ':id', component: OrderPositionsComponent },
    ] },
    { path: 'history', component: HistoryComponent },
    { path: 'users-history', component: UsersOrdersComponent },
    { path: 'analytics', component: AnalyticsComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {}
