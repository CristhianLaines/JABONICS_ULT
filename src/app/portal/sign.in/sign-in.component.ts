import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { YtsSessionService } from 'src/app/commons/services/session/session.service';
import { YtsSweetAlertService } from 'src/app/commons/services/sweet-alert/sweet-alert.service';
import Swal from 'sweetalert2';

import { SignInHttp } from '../commons/http/sign-in.http';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    form: FormGroup;

    get formValid(): boolean {
        return this.form.pristine || this.form.invalid;
    }

    get usernameControl(): FormControl {
        return this.form.get('username') as FormControl;
    }

    get passwordControl(): FormControl {
        return this.form.get('password') as FormControl;
    }

    get remembermeControl(): FormControl {
        return this.form.get('rememberme') as FormControl;
    }

    constructor(
        private fb: FormBuilder,
        private sweetAlertService: YtsSweetAlertService,
        private router: Router,
        private signInHttp: SignInHttp,
        private sessionService: YtsSessionService
    ) {
        this.form = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            rememberme: [false] 
        });
    }

    ngOnInit(): void {
    }

    signIn(): void {
        if (this.form.valid) {
            this.validateCredentials();
        }
    }

    validateCredentials(): void {
        this.sweetAlertService.showLoading();
        const username = this.usernameControl.value as string;
        const password = this.passwordControl.value as string;
        if (username === 'user' && password === 'jabonics') {
            this.signInHttp
                .signIn(username, password)
                .pipe(finalize(() => this.sweetAlertService.closeLoading()))
                .subscribe(user => {
                    // window.localStorage.setItem('user', JSON.stringify(user));
                    this.sessionService.isLocaStorage = this.remembermeControl.value as boolean;
                    this.sessionService.saveUser(user);
                    this.goToHome();
                });
            // setTimeout(() => {
            //   this.sweetAlertService.closeLoading();
            //   this.goToHome();
            // }, 2000);
        }
        else {
            this.sweetAlertService.closeLoading();
            this.sweetAlertService.showMessage('error','Has ingresado tu usuario o contraseña de forma incorrecta');
        }
    }

    goToHome(): void {
        this.router.navigateByUrl('/admin');
        
    }

}