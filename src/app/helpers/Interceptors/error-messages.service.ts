import { Injectable } from '@angular/core';
import { swal as Swal } from '../swal-config';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
    providedIn: 'root'
})

export class ErrorService {
    skipSwalUrls: RegExp[] = [];

    constructor(private authService: AuthenticationService) { }

    addSkipUrl(e: string) {
        this.skipSwalUrls.push(new RegExp(e));
    }

    get skipUrls() {
        return this.skipSwalUrls;
    }

    skipSwals(url: string) {
        return this.skipSwalUrls.some(e => {
            return e.test(url);
        });
    }

    handleErrors(err: any) {
        const errorSet = {
            default: {
                element: 'Error!',
                message: 'Unexpected Error. Please try again'
            },
            unauthorized: {
                element: 'Unauthorized!',
                message: 'You are not authorized to do this action. Please log in with appropriate credentials'
            }
        };

        let errArray = (err.error && err.error.error && err.error.error.length) ? err.error.error : [errorSet.default];

        if ((err.status === 401) || (err.status === 403)) {
            errArray = [errorSet.unauthorized];
            this.authService.logout();
        }

        let errMsg = '';
        errArray.forEach((x: any) => {
            errMsg += x.message + ', ';
        });
        errMsg = errMsg.slice(0, -2);

        if (!this.skipSwals(err.url)) {
            Swal.fire('Error!', errMsg, 'error');
        }

        return errMsg;
    }

}
