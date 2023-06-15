import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { last } from 'rxjs';
import { IUsuario } from '../commons/interfaces/usuario.interface';
import { UsuarioHttp } from '../commons/http/usuario.http';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuariosForm: FormGroup;
  dataSource: MatTableDataSource<IUsuario>;
  displayedColumns: string[];
  UsuariosList: IUsuario[] = [];
  labelAddOrEdit: string = 'Agregar';

    //#region Controls
    get NUsuarioControl(): FormControl {
      return this.usuariosForm.get('NUsuario') as FormControl;
    }
    get TContrasenaControl(): FormControl {
      return this.usuariosForm.get('TContrasena') as FormControl;
    }
    //#endregion

    //#region Errors
    get NUsuarioError(): string {
      if (this.NUsuarioControl.hasError('required')) {
        return 'Este campo es obligatorio';
      }
      return '';
    }
    get TContrasenaError(): string {
      if (this.TContrasenaControl.hasError('required')) {
        return 'Este campo es obligatorio';
      }
      return '';
    }
    //#endregion

  constructor(
    private fb: FormBuilder,
    private usuarioHttp: UsuarioHttp,
    private router: Router,
    private activatedRoute : ActivatedRoute,
  ) {
    this.usuariosForm = this.fb.group({
      CUsuario: [null],
      NUsuario: [null, [Validators.pattern('^[a-zA-Z ]{3,25}$'), Validators.required]],
      TContrasena: [null, [Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+-=?<>]{6,10}$'), Validators.required]],
    });
    this.dataSource = new MatTableDataSource();
    this.displayedColumns = [
      'codigo',
      'nombre',
      'contrasena',
      'editar',
      'eliminar'
    ];
  }

  ngOnInit(): void {
    this.getAllUsuarios();
  }

  getAllUsuarios(): void {
    console.log('getAllUsuarios')
    this.usuarioHttp
      .getAll()
      .subscribe(res => {
        console.log('res', res)
        this.UsuariosList = res;
        this.dataSource = new MatTableDataSource(res);
      });
  }

  delete(codigo: number): void {
    const usuarios = this.UsuariosList.filter(item => item.CUsuario !== codigo);
    this.UsuariosList = usuarios;
    this.dataSource = new MatTableDataSource(usuarios);
  }

  edit(element: IUsuario): void {
    console.log('element', element)
    this.labelAddOrEdit = 'Editar';
    this.usuariosForm.setValue({
      CUsuario: element.CUsuario,
      NUsuario: element.NUsuario,
      TContrasena: element.TContrasena
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save(): void {
    if (this.usuariosForm.valid) {
      console.log('save')
      const usuarios = this.usuariosForm.value as IUsuario;
      console.log('usuarios', usuarios)
      if (usuarios.CUsuario) {
        // edit
        const usuariosFound = this.UsuariosList.find(x => x.CUsuario === usuarios.CUsuario);
        usuariosFound.NUsuario = usuarios.NUsuario;
        usuariosFound.TContrasena = usuarios.TContrasena;
        console.log('usuariosFound', usuariosFound);
        this.clear();

      } else {
        // agrego
        const ids = this.UsuariosList.map(object => {
            return object.CUsuario;
          });
        console.log(ids);

        const max = Math.max.apply(null,ids);
        usuarios.CUsuario = max +1;

        this.UsuariosList.push(usuarios);
        this.dataSource = new MatTableDataSource(this.UsuariosList);
        this.clear();
        // console.log('max', max);
        // console.log('ids', ids);
      }
    }
  }

  clear(): void {
    this.usuariosForm.reset({
      CUsuario: null,
      NUsuario: null,
      TContrasena: null
    });
    this.labelAddOrEdit = 'Agregar';
  }
}
