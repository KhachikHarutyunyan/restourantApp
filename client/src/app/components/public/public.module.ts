import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteLayoutComponent } from '../../shared/layouts/site-layout/site-layout.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './register/register.component';
import { PublicRoutingModule } from './public.routing.module';
import { MenuListComponent } from './menu-page/menu-list/menu-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileGuard } from '../../shared/services/profile.guard';
import { UserOrderComponent } from './profile/user-order/user-order.component';
import { LoaderComponent } from '../loader/loader.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PublicRoutingModule
  ],
  declarations: [
    SiteLayoutComponent,
    AboutComponent,
    HomePageComponent,
    ContactComponent,
    ContactFormComponent,
    FooterComponent,
    LoginPageComponent,
    MenuPageComponent,
    NavigationComponent,
    RegisterComponent,
    MenuListComponent,
    ProfileComponent,
    UserOrderComponent,
    LoaderComponent
  ],
  providers: [ProfileGuard]
})

export class PublicModule {}
