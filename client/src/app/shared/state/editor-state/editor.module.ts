import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { CreateEffects } from ".";

@NgModule({
    imports: [
        EffectsModule.forFeature([CreateEffects.CreateEffects])
    ],
})
export class EditorModule {}