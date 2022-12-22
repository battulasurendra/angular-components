import { AbstractControl, ValidatorFn } from '@angular/forms';
import { DynamicObject } from '@app/models';

export type BooleanFn = () => boolean;

export function ConditionalValidator(predicate: BooleanFn, validator: ValidatorFn, errorNamespace?: string): ValidatorFn {
    return (formControl: AbstractControl): { [key: string]: any } | null => {
        if (!formControl.parent) {
            return null;
        }

        let error = null;

        if (predicate()) {
            error = validator(formControl);
        }

        if (errorNamespace && error) {
            const customError: DynamicObject = {};
            customError[errorNamespace] = error;
            error = customError;
        }
        return error;
    };
}
