import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursosComponent } from './cursos/cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNovoComponent } from './curso-novo/curso-novo.component';
import { CursoEditarComponent } from './curso-editar/curso-editar.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaDetalheComponent } from './categoria-detalhe/categoria-detalhe.component';
import { CategoriaNovoComponent } from './categoria-novo/categoria-novo.component';
import { CategoriaEditarComponent } from './categoria-editar/categoria-editar.component';

const routes: Routes = [
  {
    path: 'cursos',
    component: CursosComponent,
    data: { title: 'Lista de Cursos' }
  },
  {
    path: 'curso-detalhe/:idCurso',
    component: CursoDetalheComponent,
    data: { title: 'Detalhe do Curso' }
  },
  {
    path: 'curso-novo',
    component: CursoNovoComponent,
    data: { title: 'Adicionar Curso' }
  },
  {
    path: 'curso-editar/:idCurso',
    component: CursoEditarComponent,
    data: { title: 'Editar o Curso' }
  },
  { path: '',
    redirectTo: '/cursos',
    pathMatch: 'full'
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
    data: { title: 'Lista de Categorias' }
  },
  {
    path: 'categoria-detalhe/:idCategoria',
    component: CategoriaDetalheComponent,
    data: { title: 'Detalhe da Categoria' }
  },
  {
    path: 'categoria-novo',
    component: CategoriaNovoComponent,
    data: { title: 'Adicionar Categoria' }
  },
  {
    path: 'categoria-editar/:idCategoria',
    component: CategoriaEditarComponent,
    data: { title: 'Editar a Categoria' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
