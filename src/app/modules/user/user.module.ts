import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';

import { LoginComponent, ForgotPasswordComponent, ResetPasswordComponent, SignupComponent, EmailverificationComponent } from '@app/components';

import { MatSelectModule } from '@angular/material/select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
    declarations: [
        UserComponent,
        LoginComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        SignupComponent,
        EmailverificationComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        UserRoutingModule,
        MatSelectModule,
        SweetAlert2Module
    ]
})
export class UserModule { }
