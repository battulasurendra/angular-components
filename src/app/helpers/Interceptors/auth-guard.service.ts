import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.user;
        if (currentUser) {
            if (route.data && route.data['roles'] && route.data['roles'].indexOf(currentUser.role) === -1) {
                this.router.navigate(['/dashboard']);
                return false;
            }
            return true;
        } else {
            // If not logged in return to login page with redirect url
            this.authService.logout();
            return false;
        }
    }
}
