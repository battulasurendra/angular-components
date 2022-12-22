import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, Event, ActivationEnd, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './services';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
    siteTitle = 'GRID';
    pageTitle!: string;
    isLogged = false;
    mobileQuery: MediaQueryList;

    fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

    fillerContent = Array.from(
        { length: 50 },
        () =>
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
         laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
         voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
         cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    );

    private _mobileQueryListener: () => void;

    constructor(private titleService: Title, private router: Router, private authService: AuthenticationService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.setTitle(this.siteTitle);
        this.authService.currentUser.subscribe(user => {
            if (user) {
                this.isLogged = true;
            } else {
                this.isLogged = false;
            }
        });
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.router.events.subscribe((e: Event) => {
            if (e instanceof ActivationEnd) {
                if (e.snapshot && e.snapshot.routeConfig && e.snapshot.routeConfig.data && e.snapshot.routeConfig.data['title']) {
                    this.pageTitle = e.snapshot.routeConfig.data['title'];
                }
            }

            if (e instanceof NavigationEnd) {
                this.pageTitle = this.pageTitle ? (this.pageTitle + ' | ' + this.siteTitle) : this.siteTitle;
                this.setTitle(this.pageTitle);
                this.pageTitle = '';
            }
        });
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    private setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }
}
