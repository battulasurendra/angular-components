import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/services';
import { first } from 'rxjs/operators';
import { BackendValidator, Swal } from '@app/helpers';
import { Role } from '@app/models';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    forgotForm!: FormGroup;
    roles = Role;
    submitted = false;
    formError!: string | null;
    formSuccess!: string;
    backendErrorText!: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.forgotForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
            role: ['', Validators.required]
        });
    }

    get f() { return this.forgotForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.forgotForm.invalid) {
            return;
        }

        this.authService.forgot(this.forgotForm.value).pipe(first())
            .subscribe(data => {
                this.formSuccess = data.data.message;
                Swal.fire(
                    'Success!',
                    'Email Sent with change password Link',
                    'success'
                );
            }, error => {
                this.formError = error;
            });
    }

}
