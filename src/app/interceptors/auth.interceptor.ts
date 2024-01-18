import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';



import { Observable, throwError } from 'rxjs';
import { catchError, switchMap} from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

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
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {      
    return  this.authService.refresh().pipe(
        switchMap((res) => {
          const token = res['accessToken'];
          window.localStorage.setItem('token', token);
          window.localStorage.setItem('refreshToken', res['refreshToken']);
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            }
          });
          return next.handle(request);
        })
      )
      
    
  }
}

