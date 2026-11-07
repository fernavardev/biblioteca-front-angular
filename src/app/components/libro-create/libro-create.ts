import { Component, inject } from '@angular/core';
import { LibroService } from '../../services/libro';
import { Libro } from '../../models/libro';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-libro-create',
  imports: [FormsModule],
  templateUrl: './libro-create.html',
  styleUrl: './libro-create.css',
})
export class LibroCreate {
  private libroService = inject(LibroService);

  nuevoLibro: Omit<Libro, 'id'> = {
    titulo: '',
    autor: '',
    anioPublicacion: 0,
    genero: ''
  };

  guardarLibro(): void {
    this.libroService.crearLibro(this.nuevoLibro).subscribe({
      next: (libroCreado) => {
        console.log('Libro registrado correctamente:', libroCreado);
        alert('Libro creado correctamente');
      },
      error: (error) => {
        console.error('Error al registrar el libro:', error);
      }
    });
  }
}