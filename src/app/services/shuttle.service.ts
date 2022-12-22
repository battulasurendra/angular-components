import { Injectable } from '@angular/core';
import { DynamicObject } from '@app/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ShuttleService {
    private booleanShuttleSubject: BehaviorSubject<{}>;
    private windowLoaderSubject: BehaviorSubject<boolean>;
    private booleanShuttle: DynamicObject = {};

    constructor() {
        this.booleanShuttleSubject = new BehaviorSubject<{}>(this.booleanShuttle);
        this.windowLoaderSubject = new BehaviorSubject<boolean>(false);
    }

    getShuttle(): Observable<any> {
        return this.booleanShuttleSubject.asObservable();
    }

    setShuttle(key: string, value: any) {
        this.booleanShuttle = {};
        this.booleanShuttle[key] = value;
        this.booleanShuttleSubject.next(this.booleanShuttle);
    }

    loaderSubscription(): Observable<boolean> {
        return this.windowLoaderSubject.asObservable();
    }

    loader(status: boolean) {
        this.windowLoaderSubject.next(status);
    }
}
