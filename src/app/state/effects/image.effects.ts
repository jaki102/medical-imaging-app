import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AppActions from "../actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { DataService } from "../../services/data.service";
import { of } from "rxjs";

Injectable();
export class ImageEffects {
  private readonly actions$ = inject(Actions);
  private readonly dataService = inject(DataService);

  loadImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.drawImageAndAnnotationsButtonClicked),
      switchMap(() =>
        this.dataService.loadImage().pipe(
          map((blob: Blob) => AppActions.loadImageSuccess({ blob })),
          catchError((err) => of(AppActions.loadImageError()))
        )
      )
    )
  );
}
