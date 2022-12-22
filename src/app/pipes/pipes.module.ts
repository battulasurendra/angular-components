import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrdinalPipe } from './ordinal.pipe';
import { DynamicPipe } from './dynamic.pipe';
import { HumanizePipe } from './humanize.pipe';
import { PINcasePipe } from './pincase.pipe';

@NgModule({
    declarations: [OrdinalPipe, DynamicPipe, HumanizePipe],
    imports: [],
    exports: [OrdinalPipe, DynamicPipe, HumanizePipe]
})

export class PipesModule {
    static forRoot(): ModuleWithProviders<PipesModule> {
    return {
        ngModule: PipesModule,
        providers: [],
    };
}
}
