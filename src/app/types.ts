export type Annotation = {
  id: string;
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
};

export interface AnnotationState {
  data: Annotation[];
}

export interface AppState {
  annotations: AnnotationState;
}
