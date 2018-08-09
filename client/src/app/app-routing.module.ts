import { NgModule } from '../../node_modules/@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './public/home-page/home-page.component';
import { LoginPageComponent } from './public/login-page/login-page.component';
import { MenuPageComponent } from './public/menu-page/menu-page.component';
import { AboutComponent } from './public/about/about.component';
import { ContactComponent } from './public/contact/contact.component';
import { RegisterComponent } from './public/register/register.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { AdminModule } from './components/admin/admin.module';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: SiteLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'menu', component: MenuPageComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  // { path: 'admin', loadChildren: './components/admin/admin.module#AdminModule' },
  { path: 'admin', loadChildren: () => AdminModule },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
