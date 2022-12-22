import { Pipe, PipeTransform, Injector, InjectionToken, Type } from '@angular/core';
import { LowerCasePipe, DatePipe } from '@angular/common';

@Pipe({
    name: 'dynamicPipe'
})

export class DynamicPipe implements PipeTransform {

    public constructor(private lowercase: LowerCasePipe, private date: DatePipe) {
    }

    transform(value: any, pipeToken: string): any {
        const pipeArgs = pipeToken.split(':');
        if (pipeArgs.length) {
            const pipe = pipeArgs[0];
            pipeArgs.shift();
            return this[pipe].transform(value, ...pipeArgs);
        }
        console.log('Import pipe and add to provider');
        return value;
    }
}
