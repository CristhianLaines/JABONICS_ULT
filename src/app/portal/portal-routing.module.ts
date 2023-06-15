import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './sign.in/sign-in.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';

const routes: Routes = [
  {
    // path: '',
    // redirectTo: 'sign-in',
    // pathMatch: 'full'

      path: '', //recien agregado
      redirectTo: 'dashboard',
      pathMatch: 'full'

  },
  {
    path: 'sign_in',
    component: SignInComponent,
  },
  {
    path: 'sobre_nosotros',
    component: SobreNosotrosComponent,
  },
  { //recién agregado
    path: 'dashboard',
    component: DashboardComponent, 
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }