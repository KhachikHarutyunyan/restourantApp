import { NgModule } from '../../../../node_modules/@angular/core';
import { RouterModule, Routes } from '../../../../node_modules/@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AdminLayoutComponent } from '../../shared/layouts/admin-layout/admin-layout.component';
import { AdminGuard } from '../../shared/services/admin.guard';
import { OverviewComponent } from './overview/overview.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';

const routes: Routes = [
  { path: '', component: AdminLayoutComponent, canActivateChild: [AdminGuard], children: [
    { path: '', component: OverviewComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'categories/new', component: CategoriesFormComponent },
    { path: 'categories/:id', component: CategoriesFormComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {}
