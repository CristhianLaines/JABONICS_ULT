import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { PortalHttpModule } from "./http.module";
import userSessionData from 'src/assets/data/user-session.json';
import { IUserGet } from "../interfaces/user-get.interface";

@Injectable({
    providedIn: PortalHttpModule
})
export class SignInHttp {

    constructor() { }

    signIn(username: string, password: string): Observable<IUserGet> {
        return of<IUserGet>(userSessionData)
            .pipe(
                delay(3000),
            );
    }
}