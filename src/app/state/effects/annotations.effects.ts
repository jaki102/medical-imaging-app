import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AppActions from "../actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { DataService } from "../../services/data.service";
import { of } from "rxjs";
import { Annotation } from "../../types";

Injectable();
export class AnnotationEffects {
  private readonly actions$ = inject(Actions);
  private readonly dataService = inject(DataService);

  loadAnnotations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.drawImageAndAnnotationsButtonClicked),
      switchMap(() =>
        this.dataService.loadAnnotations().pipe(
          map((data: Annotation[]) =>
            AppActions.loadAnnotationsSuccess({ data })
          ),
          catchError((err) => of(AppActions.loadAnnotationsError()))
        )
      )
    )
  );
}
