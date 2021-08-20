import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { GridEffects, LayoutEffects, WidgetEffects } from ".";

@NgModule({
    imports: [
        EffectsModule.forFeature([LayoutEffects.LayoutEffects, GridEffects.GridEffects, WidgetEffects.WidgetEffects])
    ]
})
export class DisplayModule {}