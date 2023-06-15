import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { YtsSweetAlertService } from 'src/app/commons/services/sweet-alert/sweet-alert.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactusForm: FormGroup;
  labelSave: string='Contáctanos';
  

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private sweetAlertService: YtsSweetAlertService,
    private activatedRoute: ActivatedRoute,
  ) { this.contactusForm=this.fb.group({
    NUsuario: ['', [Validators.required]],
    TEmail: ['', [Validators.required]],
    TMensaje: ['', [Validators.required]],
    
  });
}

  ngOnInit(): void {
  }

  save(): void{
    if(this.contactusForm.valid){
      this.contactusForm.reset({
      NUsuario: '',
      TEmail: '',
      TMensaje: ''
    });}
    else{
      this.sweetAlertService.showMessage('warning','Debe rellenar todos los campos');
    }
  }
}
