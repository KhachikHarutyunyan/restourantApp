import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { HomePageComponent } from './public/home-page/home-page.component';
import { LoginPageComponent } from './public/login-page/login-page.component';
import { FooterComponent } from './public/footer/footer.component';
import { MenuPageComponent } from './public/menu-page/menu-page.component';
import { MenuListComponent } from './public/menu-page/menu-list/menu-list.component';
import { AboutComponent } from './public/about/about.component';
import { ContactComponent } from './public/contact/contact.component';
import { ContactFormComponent } from './public/contact/contact-form/contact-form.component';
import { RegisterComponent } from './public/register/register.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { AdminModule } from './components/admin/admin.module';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomePageComponent,
    LoginPageComponent,
    FooterComponent,
    MenuPageComponent,
    MenuListComponent,
    AboutComponent,
    ContactComponent,
    ContactFormComponent,
    RegisterComponent,
    SiteLayoutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AdminModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   multi: true,
    //   useClass: TokenInterceptor
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
