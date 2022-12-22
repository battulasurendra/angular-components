import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '@app/services';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

    constructor(private authService: AuthenticationService) {
        if (this.authService.isLoggedIn()) {
            this.authService.navigateUser();
        }
    }

    ngOnInit() {
    }

}
