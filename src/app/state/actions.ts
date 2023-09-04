import { createAction, props } from "@ngrx/store";
import { Annotation } from "../types";

export const drawImageAndAnnotationsButtonClicked = createAction(
  "DrawImageAndAnnotationsButtonClicked"
);
export const loadImageSuccess = createAction(
  "LoadImageSuccess",
  props<{ blob: Blob }>()
);
export const loadImageError = createAction("LoadImageError");
export const loadAnnotationsSuccess = createAction(
  "LoadAnnotationsSuccess",
  props<{ data: Annotation[] }>()
);
export const loadAnnotationsError = createAction("LoadAnnotationsError");
