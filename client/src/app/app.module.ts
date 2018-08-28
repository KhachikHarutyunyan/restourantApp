import { ProfileGuard } from './shared/services/profile.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AdminModule } from './components/admin/admin.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PublicModule } from './components/public/public.module';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminGuard } from './shared/services/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AdminModule,
    PublicModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('auth-token');
        }
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
    AdminGuard,
    ProfileGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
