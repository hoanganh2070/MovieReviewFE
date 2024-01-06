import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { LoaderService } from "../services/loader.service";
import { NavigationStart, Router, RouterEvent } from "@angular/router";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService,private router: Router) {

    }
    event : RouterEvent;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
     this.router.events.subscribe((event) => {
        if(event instanceof NavigationStart || performance.navigation.type === 1){
        if (request.method === 'GET' || request.url ==='http://localhost:4000/api/cloudinary/upload' ) {
            this.loaderService.requestStarted();
        }
        this.handler(next, request);
    }
    });
       return this.handler(next, request);
    }

    handler(next: HttpHandler, request: HttpRequest<any>): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (request.method === 'GET') {
                            this.loaderService.requestEnded();
                            return;
                    }
                    else if(request.url ==='http://localhost:4000/api/cloudinary/upload'){
                        setTimeout(() => {
                            this.loaderService.requestEnded();
                        }, 700);
                        return;
                    }
                    
                }
            })
        );
    }
}
