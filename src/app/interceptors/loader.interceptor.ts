import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize, tap } from "rxjs";
import { LoaderService } from "../services/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.requestStarted();
        return this.handler(next, request);
    }

    handler(next : any, request : any) {
        return next.handle(request).pipe(
             tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    setTimeout(() => {
                    this.loaderService.requestEnded();
                    },90);
                }
             })
        );
    }
}