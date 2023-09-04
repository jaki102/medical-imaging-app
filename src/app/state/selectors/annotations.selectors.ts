import { createSelector } from "@ngrx/store";
import { AnnotationState, AppState } from "../../types";

export const selectFeature = (state: AppState) => state.annotations;

export const getAnnotations = createSelector(
  selectFeature,
  (state: AnnotationState) => state.data
);
