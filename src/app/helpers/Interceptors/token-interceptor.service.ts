import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { AuthenticationService, ShuttleService } from '@app/services';
import { Observable } from 'rxjs';
import { ErrorService } from './error-messages.service';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
    private requests = 0;

    constructor(private authService: AuthenticationService, private shuttle: ShuttleService, private errorService: ErrorService) { }

    removeRequest() {
        this.requests--;
        if (this.requests < 1) {
            this.shuttle.loader(this.requests > 0);
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!req.url.includes('notifications/all')) {
            this.requests++;
            this.shuttle.loader(true);
        }

        req = this.addToken(req);

        return new Observable(observer => {
            const subscription = next.handle(req).subscribe(event => {
                if (event instanceof HttpResponse) {
                    observer.next(event);
                }
            }, err => {
                observer.error(this.errorService.handleErrors(err));
            },
                () => {
                    if (!req.url.includes('notifications/all')) {
                        this.removeRequest();
                    }
                    observer.complete();
                });

            // remove request from queue when cancelled
            return () => {
                if (!req.url.includes('notifications/all')) {
                    this.removeRequest();
                }
                subscription.unsubscribe();
            };
        });
    }

    addToken(req: HttpRequest<any>) {
        const userToken = this.authService.userToken;
        if (userToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${userToken}`
                }
            });
        }

        return req;
    }
}
