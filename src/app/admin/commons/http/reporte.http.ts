// import { Injectable } from "@angular/core";
// import { asyncScheduler, delay, Observable, of, scheduled } from "rxjs";
// import { AdminHttpModule } from "./http.module";
// import usuarioGetAllData from 'src/assets/data/usuario-get-all.json';
// import { IReporte } from '../interfaces/reporte.interface';

// @Injectable({
//   providedIn: AdminHttpModule
// })
// export class UsuarioHttp {

//   constructor() { }

//   getAll(): Observable<IReporte[]>{
//     return scheduled<IReporte[]>([reporteGetAllData], asyncScheduler)
//       .pipe(delay(1000));
//   }
// }