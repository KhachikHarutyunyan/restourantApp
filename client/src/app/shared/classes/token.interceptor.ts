import { Injectable } from '../../../../node_modules/@angular/core';
import { HttpInterceptor, HttpRequest,
   HttpEvent, HttpHandler, HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '../../../../node_modules/@angular/router';
import { Observable, throwError } from '../../../../node_modules/rxjs';
import { catchError } from '../../../../node_modules/rxjs/operators';


@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.auth.getToken()
        }
      });
    }
    return next.handle(req).pipe(
      catchError(
        (error: HttpErrorResponse) => this.handleAuthError(error)
      )
    );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      this.router.navigate(['/login'], {
        queryParams: {
          sessionFailed: true
        }
      });
    }
    return throwError(err);
  }

}
