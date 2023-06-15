import { Injectable } from "@angular/core";
import { asyncScheduler, delay, Observable, of, scheduled } from "rxjs";
import { AdminHttpModule } from "./http.module";
import usuarioGetAllData from 'src/assets/data/usuario-get-all.json';
import { IUsuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: AdminHttpModule
})
export class UsuarioHttp {

  constructor() { }

  getAll(): Observable<IUsuario[]>{
    return scheduled<IUsuario[]>([usuarioGetAllData], asyncScheduler)
      .pipe(delay(1000));
  }
}