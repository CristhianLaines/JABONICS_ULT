import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { last } from 'rxjs';
import { ITipoProducto } from '../commons/interfaces/tipo-producto.interface';
import { TipoProductoHttp } from '../commons/http/tipo-producto.http';


@Component({
  selector: 'app-tipoProducto',
  templateUrl: './tipoProducto.component.html',
  styleUrls: ['./tipoProducto.component.css']
})
export class TipoProductoComponent implements OnInit {

  tipoProductoForm: FormGroup;
  dataSource: MatTableDataSource<ITipoProducto>;
  displayedColumns: string[];
  TipoProductoList: ITipoProducto[] = [];
  labelAddOrEdit: string = 'Agregar';

//#region Controls
get NTipoProductoControl(): FormControl {
  return this.tipoProductoForm.get('NTipoProducto') as FormControl;
}
//#endregion

//#region Errors
get NTipoProductoError(): string {
  if (this.NTipoProductoControl.hasError('required')) {
    return 'You must enter a value';
  }
  return '';
}
//#endregion


  constructor(
    private fb: FormBuilder,
    private tipoProductoHttp: TipoProductoHttp,
    private router: Router,
    private activatedRoute : ActivatedRoute,
  ) {
    this.tipoProductoForm = this.fb.group({
      CTipoProducto: [null],
      NTipoProducto: [null, [Validators.pattern('^[a-zA-Z0-9 ]{1,25}$'), Validators.required]]
    });
    this.dataSource = new MatTableDataSource();
    this.displayedColumns = [
      'codigo',
      'nombre',
      'editar',
      'eliminar'
    ];
  }

  ngOnInit(): void {
    this.getAllTipoProducto();
  }

  getAllTipoProducto(): void {
    console.log('getAllTipoProducto')
    this.tipoProductoHttp
      .getAll()
      .subscribe(res => {
        console.log('res', res)
        this.TipoProductoList = res;
        this.dataSource = new MatTableDataSource(res);
      });
  }

  delete(codigo: number): void {
    const tipoProducto = this.TipoProductoList.filter(item => item.CTipoProducto !== codigo);
    this.TipoProductoList = tipoProducto;
    this.dataSource = new MatTableDataSource(tipoProducto);
  }

  edit(element: ITipoProducto): void {
    console.log('element', element)
    this.labelAddOrEdit = 'Editar';
    this.tipoProductoForm.setValue({
      CTipoProducto: element.CTipoProducto,
      NTipoProducto: element.NTipoProducto
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save(): void {
    if (this.tipoProductoForm.valid) {
      console.log('save')
      const tipoProducto = this.tipoProductoForm.value as ITipoProducto;
      console.log('tipoProducto', tipoProducto)
      if (tipoProducto.CTipoProducto) {
        // edit
        const tipoProductoFound = this.TipoProductoList.find(x => x.CTipoProducto === tipoProducto.CTipoProducto);
        tipoProductoFound.NTipoProducto = tipoProducto.NTipoProducto;
        console.log('tipoProductoFound', tipoProductoFound);
        this.clear();

      } else {
        // agrego
        const ids = this.TipoProductoList.map(object => {
            return object.CTipoProducto;
          });
        console.log(ids);

        const max = Math.max.apply(null,ids);
        tipoProducto.CTipoProducto = max +1;

        this.TipoProductoList.push(tipoProducto);
        this.dataSource = new MatTableDataSource(this.TipoProductoList);
        this.clear();
        // console.log('max', max);
        // console.log('ids', ids);
      }
    }
  }

  clear(): void {
    this.tipoProductoForm.reset({
      CTipoProducto: null,
      NTipoProducto: null
    });
    this.labelAddOrEdit = 'Agregar';
  }
}
