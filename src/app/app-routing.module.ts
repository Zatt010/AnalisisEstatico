import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { SignUpComponent } from './paginas/sign-up/sign-up.component';
import { HomeComponent } from './paginas/home/home.component';
import { HUserComponent } from './paginas/huser/huser.component';
import { HAdminComponent } from './paginas/hadmin/hadmin.component';
import { MadminsComponent } from './paginas/admin/madmins/madmins.component';
import { UserComponent } from './paginas/user/user.component';
import{CreateEventComponent} from './paginas/create-event/create-event.component';
import{AdminTicketsComponent} from './paginas/admin-tickets/admin-tickets.component';
import{CreateDatosUsuarioComponent} from './paginas/create-datos-usuario/create-datos-usuario.component';
import{HomeUsuariosComponent} from './paginas/home-usuarios/home-usuarios.component';
import{EventosUsuariosComponent} from './paginas/eventos-usuarios/eventos-usuarios.component';
import{EntradasUsuariosComponent} from './paginas/entradas-usuarios/entradas-usuarios.component';
import{ChangeinfoComponent} from './paginas/changeinfo/changeinfo.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'user/:id',
    component: HUserComponent,
    children:[
      {
      path: 'home/:id',
      component: HomeUsuariosComponent,
      },
      {
        path: 'events/:id',
        component: EventosUsuariosComponent,
        },
        {
          path: 'tickets/:id',
          component: EntradasUsuariosComponent,
          },
          {
            path: 'info/:id',
            component: ChangeinfoComponent,
            }
    ]
  },
  {
    path: 'user/:id/cdata',
    component: CreateDatosUsuarioComponent
  },
  {
    path: 'admin',
    component: HAdminComponent,
    children: [
      {
        path: 'madmins',
        component: MadminsComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'cevent',
        component: CreateEventComponent
      },
      {
        path: 'tickets',
        component: AdminTicketsComponent
      }
    ]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
