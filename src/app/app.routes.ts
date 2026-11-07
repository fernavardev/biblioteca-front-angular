import { Routes } from '@angular/router';
import { LibroList } from './components/libro-list/libro-list';
import { LibroDetail } from './components/libro-detail/libro-detail';
import { LibroCreate } from './components/libro-create/libro-create';
import { LibroEdit } from './components/libro-edit/libro-edit';

export const routes: Routes = [
  { path: 'libros/nuevo', component: LibroCreate },
  { path: 'libros/:id/editar', component: LibroEdit },
  { path: 'libros', component: LibroList },
  { path: 'libros/:id', component: LibroDetail },
  { path: '', redirectTo: 'libros', pathMatch: 'full' }
];