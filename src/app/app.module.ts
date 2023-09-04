import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AppComponent } from "./app.component";
import { annotationReducer } from "./state/reducers/annotations.reducer";
import { AnnotationEffects } from "./state/effects/annotations.effects";
import { ImageEffects } from "./state/effects/image.effects";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ annotations: annotationReducer }),
    EffectsModule.forRoot([AnnotationEffects, ImageEffects]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
