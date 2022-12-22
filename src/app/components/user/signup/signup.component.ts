import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/services';
import { ConditionalValidator, Swal } from '@app/helpers';
import { first } from 'rxjs/operators';
import { Role } from '@app/models';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    signupForm!: FormGroup;
    roles = Role;
    submitted = false;
    formError!: string | null;
    backendErrorText!: string;
    selectedRole!: string;
    isBizIdRequired!: boolean;

    constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) {
    }

    ngOnInit() {

        this.signupForm = this.formBuilder.group({
            role: ['', Validators.required],
            bizID: ['', ConditionalValidator(() => this.isBizIdRequired, Validators.required)],
            emailID: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
            password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*().-_]).{8,99}')]],
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
            phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
            address: this.formBuilder.group({
                street: ['', Validators.required],
                city: ['', Validators.required],
                province: ['', Validators.required],
                country: ['', Validators.required],
                postalcode: ['', [Validators.required, Validators.pattern(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)]],
            }),
            terms: ['', Validators.requiredTrue]
        });

        this.signupForm.get('role')?.valueChanges.subscribe(value => {
            if (value === 'ADMIN' || value === 'INDIVIDUAL') {
                this.isBizIdRequired = false;
            } else {
                this.isBizIdRequired = true;
            }
            this.signupForm.get('bizID')?.patchValue('');
            this.signupForm.get('bizID')?.updateValueAndValidity();
        });
    }

    get f() { return this.signupForm.controls; }
    get t() { return this.f['address'] as FormGroup; }

    onSubmit() {
        this.submitted = true;

        if (this.signupForm.invalid) {
            return;
        }

        this.authService.signup(this.signupForm.value).pipe(first())
            .subscribe(data => {
                Swal.fire(
                    'Registered Successfully!',
                    'Please check your email for confirmation link before login!',
                    'success'
                );
                this.authService.navigateUser();
            }, error => {
                this.formError = error.error || 'Unexpected Error. Please try again.';
                console.log(error);
            });
    }

}
