import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { LoginComponent, ResetPasswordComponent, ForgotPasswordComponent, SignupComponent, EmailverificationComponent } from '@app/components';


const routes: Routes = [
    {
        path: '', component: UserComponent, children: [
            { path: 'login', component: LoginComponent, data: { title: 'Login' } },
            { path: 'forgot', component: ForgotPasswordComponent },
            { path: 'register', component: SignupComponent, data: { title: 'Register' } },
            { path: 'verifyEmail/:verificationCode', component: EmailverificationComponent },
            { path: 'reset/:verificationCode', component: ResetPasswordComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
