import { Component, inject, signal, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro';
import { Libro } from '../../models/libro';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-libro-list',
  imports: [RouterLink],
  templateUrl: './libro-list.html',
  styleUrl: './libro-list.css',
})
export class LibroList implements OnInit {
  private libroService = inject(LibroService);

  libros = signal<Libro[]>([]);

  ngOnInit(): void {
    this.libroService.getLibros().subscribe({
      next: (datos) => {
        this.libros.set(datos);
      },
      error: (error) => {
        console.error('Error al obtener los libros:', error);
      }
    });
  }

  eliminarLibro(id: number): void {
    const confirmado = confirm(
      '¿Estás seguro de que deseas eliminar este libro?'
    );

    if (!confirmado) {
      return;
    }

    this.libroService.eliminarLibro(id).subscribe({
      next: () => {
        console.log('Libro eliminado correctamente:', id);

        this.libros.update(libros =>
          libros.filter(libro => libro.id !== id)
        );
      },
      error: (error) => {
        console.error('Error al eliminar el libro:', error);
      }
    });
  }
}