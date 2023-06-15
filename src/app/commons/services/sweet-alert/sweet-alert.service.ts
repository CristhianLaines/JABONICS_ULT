import { Injectable } from '@angular/core';
import { YtsSweetAlertModule } from './sweet-alert.module';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
    providedIn: YtsSweetAlertModule,
})
export class YtsSweetAlertService {
    iconColor!: string;
    Swal: any;

    showLoading(title = 'Cargando ...'): void {
        Swal.fire({
            title,
            allowEscapeKey: false,
            allowOutsideClick: false,
            heightAuto: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
    }

    closeLoading(): void {
        Swal.close();
    }

    showMessage(icon: SweetAlertIcon, title: string, timer = undefined): void {
        if (icon == 'success') {
            this.iconColor = '#80D2CE';
        } else if (icon == 'error') {
            this.iconColor = '#E64442';
        }
        else if (icon == 'warning') {
            this.iconColor = '245, 195, 120';
        }

        setTimeout(() => {
            Swal.fire({
                title,
                icon,
                iconColor: this.iconColor,
                showConfirmButton: true,
                timer,
                heightAuto: false
            });
        });
    }
    
}