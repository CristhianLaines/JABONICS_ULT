import { TestBed } from '@angular/core/testing';

import { CmsSweetAlertService } from './sweet-alert.service';

describe('SweetAlertService', () => {
    let service: CmsSweetAlertService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CmsSweetAlertService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});