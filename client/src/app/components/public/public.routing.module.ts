import { NgModule } from '../../../../node_modules/@angular/core';
import { RouterModule, Routes } from '../../../../node_modules/@angular/router';

import { SiteLayoutComponent } from '../../shared/layouts/site-layout/site-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PublicRoutingModule {}

