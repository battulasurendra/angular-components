import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { DynamicFormData } from '@app/models';

@Injectable({
    providedIn: 'root'
})
export class DynamicFormService {
    currentRole!: string;

    constructor(private http: HttpClient) {
    }

    getInitialForm(wftype: string, pin: string): Observable<DynamicFormData> {
        return this.http.get<any>(environment.apiUrl + '/workflow/initialForm/' + wftype + '?pin=' + pin).pipe(map(data => {
            return data;
        }));
    }

    getDynamicForm(workflow: string, form: string, pin: string, consentID: number): Observable<DynamicFormData> {
        return this.http.get<any>(environment.apiUrl + '/workflow/dynamicForm?formName=' + form + '&workflowType=' + workflow + '&pin=' + pin + '&consentID=' + consentID).pipe(map(data => {
            return data;
        }));
    }

    giveConsent(formdata: {}, submitApi: string): Observable<string> {
        return this.http.post<any>(environment.apiUrl + submitApi, formdata).pipe(map(data => {
            return data;
        }));
    }
}

