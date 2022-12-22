import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User, Signup, Login, Forgot, Reset } from '@app/models';
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    private currentTokenSubject = new BehaviorSubject<string>('');
    private currentRoleSubject = new BehaviorSubject<string>('');
    public currentUser: Observable<User | null>;
    public currentRole: Observable<string>;
    public currentToken: Observable<string>;

    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
        const localUser: User = JSON.parse(localStorage.getItem('user') || '{}');
        const localToken: string = localStorage.getItem('token') || '';
        const localRole: string = localStorage.getItem('role') || '';

        this.setLocals(localUser, localToken, localRole);

        this.currentUser = this.currentUserSubject.asObservable();
        this.currentRole = this.currentRoleSubject.asObservable();
        this.currentToken = this.currentTokenSubject.asObservable();
    }

    get user(): User | null {
        return this.currentUserSubject.value;
    }

    get userToken(): string {
        return this.currentTokenSubject.value;
    }

    get role(): string {
        return this.currentRoleSubject.value;
    }

    isLoggedIn(): boolean {
        if (this.currentUserSubject.value) {
            return true;
        }
        return false;
    }

    signup(formdata: Signup): Observable<string> {
        return this.http.post<any>(environment.apiUrl + '/register', formdata).pipe(map(data => {
            this.setLocals(data.user, data.token, data.role);
            return 'Registered Successfully';
        }));
    }

    login(formdata: Login): Observable<string> {
        return this.http.post<any>(environment.apiUrl + '/login', formdata).pipe(map(data => {
            this.setLocals(data.user, data.token, data.role);
            return 'Login is Success';
        }));
    }

    forgot(formdata: Forgot): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/forgot', formdata).pipe(map(data => {
            return data;
        }));
    }

    reset(formdata: Reset): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/resetPassword', formdata).pipe(map(data => {
            return data;
        }));
    }

    resend(formdata: Reset): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/resend', formdata).pipe(map(data => {
            return data;
        }));
    }

    verify(verifyCode: string): Observable<{ message: string }> {
        return this.http.get<any>(environment.apiUrl + '/verifyEmail/' + verifyCode).pipe(map(data => {
            return data;
        }));
    }

    navigateUser(url?: string): void {
        const routeUrl = '/dashboard';
        if (this.isLoggedIn()) {
            this.router.navigate([routeUrl]);
        } else {
            this.router.navigate(['/user/login']);
        }
    }

    logout(): void {
        this.clearLocals();
        this.router.navigate(['/user/login']);
    }

    private setLocals(user: User, token: string, role: string) {
        if (user && token && role) {
            user.role = role;
            this.currentTokenSubject.next(token);
            this.currentUserSubject.next(user);
            this.currentRoleSubject.next(role);

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
        } else {
            this.clearLocals();
        }
    }

    private clearLocals() {
        localStorage.clear();
        this.currentRoleSubject.next('');
        this.currentTokenSubject.next('');
        this.currentUserSubject.next(null);
    }
}
