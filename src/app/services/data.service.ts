import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Annotation } from "../types";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) {}

  public loadImage(): Observable<any> {
    return this.http.request(
      "GET",
      "https://image.dummyjson.com/512x512/101010",
      {
        responseType: "blob" as "json",
      }
    );
  }

  public loadAnnotations(): Observable<Annotation[]> {
    return this.http
      .get<{ status: string; message: string }>(
        'https://dummyjson.com/http/200/[{"id":"a1","radiusX":20,"radiusY":25,"x":50,"y":60}]'
      )
      .pipe(map((res) => JSON.parse(res.message)));
  }
}
