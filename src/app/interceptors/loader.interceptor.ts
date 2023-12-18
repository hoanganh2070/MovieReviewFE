import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize, tap } from "rxjs";
import { LoaderService } from "../services/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Check if the request method is GET
        if (request.method === 'GET' ) {
            console.log(request.url);
            this.loaderService.requestStarted();
        }

        // Continue processing the request
        return this.handler(next, request);
    }

    handler(next: HttpHandler, request: HttpRequest<any>): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // Check if the request method is GET before ending the loader
                    if (request.method === 'GET') {
                        this.loaderService.requestEnded();
                    }
                }
            })
        );
    }
}
