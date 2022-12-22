import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/services';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-emailverification',
    templateUrl: './emailverification.component.html',
    styleUrls: ['./emailverification.component.scss']
})
export class EmailverificationComponent implements OnInit {
    formSuccess: any;
    verificationCode: string;
    constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
        this.verificationCode = this.route.snapshot.paramMap.get('verificationCode') || '';
    }

    ngOnInit() {
        this.verifyCode();
    }

    verifyCode() {
        this.authService.verify(this.verificationCode).pipe(first())
            .subscribe(data => {
                this.router.navigate(['user/login']);
                Swal.fire(
                    'Success!',
                    'Email verified successfully',
                    'success'
                );
            });
    }
}
