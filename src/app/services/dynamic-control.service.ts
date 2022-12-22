import { Injectable } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { ElementBase } from '@app/models';
import { ConditionalValidator } from '@app/helpers/validators/conditional.validator';
@Injectable()
export class DynamicControlService {
    constructor() { }

    toFormGroup(elements: ElementBase[], data: any, conditionSet: any) {
        const itemSet: any = {};

        elements.forEach(x => {
            const set = new FormControl();
            const validations = [];

            if (x.required) {
                if (x.condition) {
                    validations.push(ConditionalValidator(() => conditionSet['is' + x.fieldname], Validators.required));
                } else if (x.type && x.type.toLocaleLowerCase() === 'checkbox') {
                    validations.push(Validators.requiredTrue);
                } else {
                    validations.push(Validators.required);
                }
            }

            if (x.errormessages?.length) {
                x.errormessages.forEach(z => {
                    if (z.type === 'pattern') {
                        validations.push(Validators.pattern(z.pattern));
                    }
                });
            }

            set.setValue(null);

            if (data) {
                set.setValue(!!data[x.fieldname] || null);
            }

            if (x.value) {
                set.setValue(x.value);
            }

            set.setValidators(validations);

            itemSet[x.fieldname] = set;
        });
        return itemSet;
    }
}
