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
import { LoaderComponent } from '../loader/loader.component';
import { PositionService } from '../../shared/services/position.service';
import { TokenInterceptor } from '../../shared/classes/token.interceptor';
import { OrdersComponent } from './orders/orders.component';
import { OrdersService } from '../../shared/services/orders.service';
import { OrderService } from './orders/order.service';
import { OrderCategoriesComponent } from './orders/order-categories/order-categories.component';
import { OrderPositionsComponent } from './orders/order-positions/order-positions.component';


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
    LoaderComponent,
    OrdersComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent
  ],
  providers: [
    AdminGuard,
    CategoryService,
    PositionService,
    OrdersService,
    OrderService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ]
})
export class AdminModule {}
