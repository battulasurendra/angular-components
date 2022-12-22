import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function DateCheck(StartDate: string, endDate: string, canBeEqual: boolean = true) {
    return (formGroup: FormGroup) => {
        const start = formGroup.controls[StartDate] || defautDate(StartDate);
        const end = formGroup.controls[endDate];

        if (end.errors && !end.errors['dateCheck']) {
            // return if another validator has already found an error on the end
            return;
        }

        if (start.value > end.value) {
            end.setErrors({ dateCheck: true });
        } else if (!canBeEqual && (start.value === end.value)) {
            end.setErrors({ dateCheck: true });
        } else {
            end.setErrors(null);
        }
    };
}

function defautDate(date: string) {
    let d = new Date(date);
    if (isNaN(d.getTime())) {
        d = new Date();
    }
    return { value: d };
}
