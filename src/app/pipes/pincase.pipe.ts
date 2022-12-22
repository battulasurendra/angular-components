import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'PINcase' })

export class PINcasePipe implements PipeTransform {
    transform(value: string, searchString: string = 'pin') {
        if (value === '') {
            return value;
        }

        const regex = new RegExp('\\b' + searchString + '\\b', 'gi');

        value = value.replace(regex, searchString.toUpperCase()) ;

        return value;
    }
}
