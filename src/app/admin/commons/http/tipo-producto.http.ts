import { Injectable } from "@angular/core";
import { asyncScheduler, delay, Observable, of, scheduled } from "rxjs";
import { AdminHttpModule } from "./http.module";
import tipoProductoGetAllData from 'src/assets/data/tipo-producto-get-all.json';
import { ITipoProducto } from "../interfaces/tipo-producto.interface";

@Injectable({
  providedIn: AdminHttpModule
})
export class TipoProductoHttp {

  constructor() { }

  getAll(): Observable<ITipoProducto[]>{
    return scheduled<ITipoProducto[]>([tipoProductoGetAllData], asyncScheduler)
      .pipe(delay(1000));
  }
}
