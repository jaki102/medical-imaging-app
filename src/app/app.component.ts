import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Actions, ofType } from "@ngrx/effects";
import * as AnnotationsActions from "./state/actions";
import { combineLatest } from "rxjs";
import { Store, select } from "@ngrx/store";
import { getAnnotations } from "./state/selectors/annotations.selectors";
import { Annotation, AppState } from "./types";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})
export class AppComponent implements OnInit {
  public readonly title = "Medical Imaging App";

  private destroyRef = inject(DestroyRef);

  constructor(private actions$: Actions, private store: Store<AppState>) {}

  public ngOnInit(): void {
    const img = document.createElement("img");

    combineLatest([
      this.actions$.pipe(ofType(AnnotationsActions.loadImageSuccess)),
      this.store.pipe(select(getAnnotations)),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([{ blob }, annotations]) => {
        const canvas = <HTMLCanvasElement>document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        img.src = URL.createObjectURL(blob);
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
        annotations.forEach((annotation: Annotation) => {
          this.drawAnnotation(ctx, annotation);
        });
      });
  }

  public loadResources(): void {
    this.store.dispatch(
      AnnotationsActions.drawImageAndAnnotationsButtonClicked()
    );
  }

  private drawAnnotation(
    ctx: CanvasRenderingContext2D,
    annotation: Annotation
  ): void {
    const { x, y, radiusX, radiusY } = annotation;
    ctx.globalCompositeOperation = "destination-over";
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, Math.PI / 4, 0, 2 * Math.PI);
    ctx.strokeStyle = "red";
    ctx.stroke();
  }
}
