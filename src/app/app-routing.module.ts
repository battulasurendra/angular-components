import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/helpers';

import { Error404Component } from '@app/components';

const routes: Routes = [
    { path: 'user', loadChildren: () => import('@app/modules/user/user.module').then(m => m.UserModule) },
    { path: '**', component: Error404Component }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
