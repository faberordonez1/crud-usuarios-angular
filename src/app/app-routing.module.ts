import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUsuariosComponent } from './components/create-usuarios/create-usuarios.component';
import { ListUsuariosComponent } from './components/list-usuarios/list-usuarios.component';

const routes: Routes = [
  { path:'', redirectTo: 'list-usuarios', pathMatch:'full'},
  { path:'list-usuarios',component:ListUsuariosComponent},
  { path:'create-usuarios', component:CreateUsuariosComponent},
  { path:'editUsuario/:id', component:CreateUsuariosComponent},
  { path:'**', redirectTo: 'list-usuarios', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
