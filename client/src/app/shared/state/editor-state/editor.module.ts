import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { CableEffects, CreateEffects } from ".";

@NgModule({
    imports: [
        EffectsModule.forFeature([CreateEffects.CreateEffects, CableEffects.CableEffects])
    ],
})
export class EditorModule {}