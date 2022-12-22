import { AbstractControl, ValidatorFn } from '@angular/forms';

export function BackendValidator(oldValue: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        return (oldValue === control.value) ? { backendError: true } : null;
    };
}
