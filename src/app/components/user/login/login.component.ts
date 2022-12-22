import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/services';
import { first } from 'rxjs/operators';
import { BackendValidator, Swal } from '@app/helpers';
import { Router } from '@angular/router';
import { Role } from '@app/models';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    roles = Role;
    submitted = false;
    formError!: string | null;
    backendErrorText!: string;
    resend = false;

    constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            emailID: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
            password: ['', Validators.required],
            role: ['', Validators.required]
        });
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.authService.login(this.loginForm.value).pipe(first())
            .subscribe(data => {
                this.router.navigate(['/dashboard']);
            }, error => {
                this.resend = true;
                console.log(error);
                this.formError = error;
            });
    }

    resendVerification() {
        this.submitted = true;

        if (!this.loginForm.get('emailID')?.value) {
            this.formError = 'Enter email ID to resend verification Link.';
            return;
        }

        this.authService.resend(this.loginForm.value).pipe(first())
            .subscribe(data => {
                Swal.fire(
                    'Success!',
                    'Email verification link has sent to your inbox',
                    'success'
                );
                this.formError = null;
                this.resend = false;
            }, error => {
                console.log(error);
                this.formError = error;
            });
    }

}
