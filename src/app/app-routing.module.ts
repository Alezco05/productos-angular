import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from "./productos/productos.component";
import { FormularioComponent } from "./productos/formulario/formulario.component";
import {ErrorComponent} from './error/error.component';
const routes: Routes = [
  { path: "", component: ProductosComponent },
  {
    path: "productos",
    component: ProductosComponent,
    children: [
      { path: "agregar", component: FormularioComponent },
      {path: "valorar/:id", component:FormularioComponent},
      { path: ":id", component: FormularioComponent }
    ]
  },
  {path:'**',component: ErrorComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
