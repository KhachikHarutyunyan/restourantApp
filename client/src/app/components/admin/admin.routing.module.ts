import { NgModule } from '../../../../node_modules/@angular/core';
import { RouterModule, Routes } from '../../../../node_modules/@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AdminLayoutComponent } from '../../shared/layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  { path: '', component: AdminLayoutComponent, children: [
    { path: '', component: CategoriesComponent },
    { path: '**', redirectTo: '/admin' },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {}
