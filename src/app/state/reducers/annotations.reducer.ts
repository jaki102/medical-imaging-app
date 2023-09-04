import { createReducer, on } from "@ngrx/store";

import * as AnnotationsActions from "../actions";
import { AnnotationState } from "../../types";

export const initialState: AnnotationState = {
  data: [],
};

export const annotationReducer = createReducer(
  initialState,
  on(AnnotationsActions.loadAnnotationsSuccess, (state, { data }) => ({
    ...state,
    data,
  }))
);
