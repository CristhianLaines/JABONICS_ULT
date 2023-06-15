import { Injectable } from '@angular/core';
import { IUserGet } from 'src/app/portal/commons/interfaces/user-get.interface';
import { YtsSessionModule } from './session.module';

@Injectable({
    providedIn: YtsSessionModule,
})
export class YtsSessionService {
    private _ytsStorage: Storage;
    private _keyUser: string;

    set isLocaStorage(value: boolean) {
        this._ytsStorage = value ? window.localStorage : window.sessionStorage;
    }

    get user(): IUserGet | null {
        const strUser = this._ytsStorage.getItem(this._keyUser);
        return strUser ? (JSON.parse(strUser) as IUserGet) : null;
    }

    constructor() {
        this._ytsStorage = window.sessionStorage;
        this._keyUser = 'user';
    }

    saveUser(user: IUserGet): void {
        this._ytsStorage.setItem(this._keyUser, JSON.stringify(user));
    }

    signOff(): void {
        this._ytsStorage.clear();
    }
}