import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/services';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch, Swal } from '@app/helpers';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    resetForm!: FormGroup;
    verificationCode: string;
    submitted = false;
    formError!: string | null;
    formSuccess!: string | null;
    backendErrorText!: string;

    constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService, private route: ActivatedRoute) {
        this.verificationCode = this.route.snapshot.paramMap.get('verificationCode') || '';
    }

    ngOnInit() {
        this.resetForm = this.formBuilder.group({
            newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*().-_]).{8,99}')]],
            confirmPassword: ['', Validators.required],
            token: this.verificationCode
        }, {
            validator: MustMatch('newPassword', 'confirmPassword')
        });
    }

    get f() { return this.resetForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.resetForm.invalid) {
            return;
        }

        this.authService.reset(this.resetForm.value).pipe(first())
            .subscribe(data => {
                this.formError = null;
                this.authService.logout();
                this.router.navigate(['user/login']);
                Swal.fire(
                    'Success!',
                    'Your password changed succesfully',
                    'success'
                );
            }, error => {
                this.formSuccess = null;
                this.formError = error;
            });
    }

}
