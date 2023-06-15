import { Injectable } from "@angular/core";
import { asyncScheduler, delay, Observable, of, scheduled } from "rxjs";
import { IProducto } from "../interfaces/producto.interface";
import { AdminHttpModule } from "./http.module";
import productoGetAllData from 'src/assets/data/producto-get-all.json';

@Injectable({
  providedIn: AdminHttpModule
})
export class ProductoHttp {

  constructor() { }

  getAll(): Observable<IProducto[]>{
    // return this.http
    //   .get<IRandomDishResponse>(`${this._endpoint}/search.php?s=${text}`)
    //   .pipe(
    //     map(res => res.meals)
    // );
    return scheduled<IProducto[]>([productoGetAllData], asyncScheduler)
      .pipe(delay(1000));
  }
}
