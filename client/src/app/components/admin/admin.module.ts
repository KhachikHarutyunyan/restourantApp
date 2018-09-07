import { AnalyticsService } from './../../shared/services/analytics.service';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { AdminGuard } from '../../shared/services/admin.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin.routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { AdminLayoutComponent } from '../../shared/layouts/admin-layout/admin-layout.component';
import { OverviewComponent } from './overview/overview.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoryService } from '../../shared/services/category.service';
import { PositionsFormComponent } from './categories/categories-form/positions-form/positions-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PositionService } from '../../shared/services/position.service';
import { TokenInterceptor } from '../../shared/classes/token.interceptor';
import { OrdersComponent } from './orders/orders.component';
import { OrdersService } from '../../shared/services/orders.service';
import { OrderService } from './orders/order.service';
import { OrderCategoriesComponent } from './orders/order-categories/order-categories.component';
import { OrderPositionsComponent } from './orders/order-positions/order-positions.component';
import { HistoryComponent } from './history/history.component';
import { HistoryFilterComponent } from './history/history-filter/history-filter.component';
import { HistoryListComponent } from './history/history-list/history-list.component';
import { AdminLoaderComponent } from './admin-loader/admin-loader.component';
import { UsersOrdersComponent } from './users-orders/users-orders.component';
import { CartService } from '../../shared/services/cart.service';
import { UsersHistoryFilterComponent } from './users-orders/users-history-filter/users-history-filter.component';
import { UsersHistoryListComponent } from './users-orders/users-history-list/users-history-list.component';
import { UsersOverviewComponent } from './overview/users-overview/users-overview.component';
import { UsersAnalyticsComponent } from './analytics/users-analytics/users-analytics.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    CategoriesComponent,
    AdminLayoutComponent,
    OverviewComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
    AdminLoaderComponent,
    OrdersComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    HistoryComponent,
    HistoryFilterComponent,
    HistoryListComponent,
    AnalyticsComponent,
    UsersOrdersComponent,
    UsersHistoryFilterComponent,
    UsersHistoryListComponent,
    UsersOverviewComponent,
    UsersAnalyticsComponent
  ],
  providers: [
    AdminGuard,
    CategoryService,
    PositionService,
    OrdersService,
    OrderService,
    AnalyticsService,
    CartService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ]
})
export class AdminModule {}
