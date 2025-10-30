import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComentarioPage } from './tabs/comentario/comentario.page';

const routes: Routes = [
  { path: '', redirectTo: '/comentario', pathMatch: 'full' },
  { path: 'comentario', component: ComentarioPage },
  // Otras rutas pueden ser añadidas aquí
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }