import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { last } from 'rxjs';
import { VentasHttp } from '../commons/http/ventas.http';
import { IVentas } from '../commons/interfaces/ventas.interface';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  ventasForm: FormGroup;
  dataSource: MatTableDataSource<IVentas>;
  displayedColumns: string[];
  VentasList: IVentas[] = [];
  labelAddOrEdit: string = 'Agregar';

//#region Controls
get CEmpleadoControl(): FormControl {
  return this.ventasForm.get('CEmpleado') as FormControl;
}
get DFechaControl(): FormControl {
  return this.ventasForm.get('DFecha') as FormControl;
}
get MMontoControl(): FormControl {
  return this.ventasForm.get('MMonto') as FormControl;
}
//#endregion

//#region Errors
get CEmpleadoError(): string {
  if (this.CEmpleadoControl.hasError('required')) {
    return 'Este campo es obligatorio';
  }
  return '';
}
get DFechaError(): string {
  if (this.DFechaControl.hasError('required')) {
    return 'La fecha inválida, vuelva a ingresar la fecha';
  }
  return '';
}
get MMontoError(): string {
  if (this.MMontoControl.hasError('required')) {
    return 'Monto inválido, por favor vuelva a ingresar';
  }
  return '';
}
//#endregion

  constructor(
    private fb: FormBuilder,
    private ventasHttp: VentasHttp,
    private router: Router,
    private activatedRoute : ActivatedRoute,
  ) {
    this.ventasForm = this.fb.group({
      CVenta: [null],
      CEmpleado: [null, [Validators.pattern('^[0-9]{8}$'), Validators.required]],
      DFecha: [null, [Validators.required]],
      MMonto: [null, [Validators.pattern('^[0-9]+([.][0-9]+)?$'), Validators.required]]
    });
    this.dataSource = new MatTableDataSource();
    this.displayedColumns = [
      'codigo',
      'empleado',
      'fecha',
      'monto',
      'editar',
      'eliminar'
    ];
  }

  ngOnInit(): void {
    this.getAllVentas();
  }

  getAllVentas(): void {
    console.log('getAllProducto')
    this.ventasHttp
      .getAll()
      .subscribe(res => {
        console.log('res', res)
        this.VentasList = res;
        this.dataSource = new MatTableDataSource(res);
      });
  }

  delete(codigo: number): void {
    const ventas = this.VentasList.filter(item => item.CVenta !== codigo);
    this.VentasList = ventas;
    this.dataSource = new MatTableDataSource(ventas);
  }

  edit(element: IVentas): void {
    console.log('element', element)
    this.labelAddOrEdit = 'Editar';
    this.ventasForm.setValue({
      CVenta: element.CVenta,
      CEmpleado: element.CEmpleado,
      DFecha: element.DFecha,
      MMonto: element.MMonto
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save(): void {
    if (this.ventasForm.valid) {
      console.log('save')
      const ventas = this.ventasForm.value as IVentas;
      console.log('ventas', ventas)
      if (ventas.CVenta) {
        // edit
        const ventasFound = this.VentasList.find(x => x.CVenta === ventas.CVenta);
        ventasFound.CEmpleado = ventas.CEmpleado;
        ventasFound.DFecha = ventas.DFecha;
        ventasFound.MMonto = ventas.MMonto;
        console.log('ventasFound', ventasFound);
        this.clear();


      } else {
        // agrego
        const ids = this.VentasList.map(object => {
            return object.CVenta;
          });
        console.log(ids);

        const max = Math.max.apply(null,ids);
        ventas.CVenta = max +1;

        this.VentasList.push(ventas);
        this.dataSource = new MatTableDataSource(this.VentasList);
        this.clear();

        // console.log('max', max);
        // console.log('ids', ids);
      }
    }
  }

  clear(): void {
    this.ventasForm.reset({
      CVenta: null,
      CEmpleado: null,
      DFecha: null,
      MMonto: null
    });
    this.labelAddOrEdit = 'Agregar';
  }
}
