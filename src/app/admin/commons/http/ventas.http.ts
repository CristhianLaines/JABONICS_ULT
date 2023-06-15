import { Injectable } from "@angular/core";
import { asyncScheduler, delay, Observable, of, scheduled } from "rxjs";
import { AdminHttpModule } from "./http.module";
import ventasGetAllData from 'src/assets/data/ventas-get-all.json';
import { IVentas } from '../interfaces/ventas.interface';

@Injectable({
  providedIn: AdminHttpModule
})
export class VentasHttp {

  constructor() { }

  getAll(): Observable<IVentas[]>{
    return scheduled<IVentas[]>([ventasGetAllData], asyncScheduler)
      .pipe(delay(1000));
  }
}