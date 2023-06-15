import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TipoProductoComponent } from './tipoProducto/tipoProducto.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductoComponent } from './producto/producto.component';
import { VentasComponent } from './ventas/ventas.component';
import { ReporteComponent } from './reporte/reporte.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'tipoProducto',
    component: TipoProductoComponent
  },
  {
    path: 'productos',
    component: ProductoComponent
  },
  {
    path: 'ventas',
    component: VentasComponent
  },
  {
    path: 'reportes',
    component: ReporteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
