import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';



import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private authService: AccountService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
    });

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401
        ) {
          console.log('401 error');
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

      
        this.authService.refresh().subscribe((res) => {
          console.log(res);
           window.localStorage.setItem('token', res.accessToken);
           window.localStorage.setItem('refreshtoken', res.refreshToken);
        });

      request.headers.set('Authorization', `Bearer ${window.localStorage.getItem('token')}`);
      return next.handle(request);
  }
}

