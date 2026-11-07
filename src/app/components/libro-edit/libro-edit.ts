import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../services/libro';
import { Libro } from '../../models/libro';

@Component({
  selector: 'app-libro-edit',
  imports: [FormsModule],
  templateUrl: './libro-edit.html',
  styleUrl: './libro-edit.css',
})
export class LibroEdit implements OnInit {
  private route = inject(ActivatedRoute);
  private libroService = inject(LibroService);

  libro = signal<Libro | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.libroService.getLibroPorId(id).subscribe({
      next: (datos) => {
        this.libro.set(datos);
      },
      error: (error) => {
        console.error('Error al obtener el libro para editar:', error);
      }
    });
  }

  guardarCambios(): void {
    const libroActual = this.libro();

    if (!libroActual) return;

    this.libroService.actualizarLibro(libroActual.id, libroActual).subscribe({
      next: (libroActualizado) => {
        console.log('Libro actualizado correctamente:', libroActualizado);
        alert('Libro editado correctamente');
      },
      error: (error) => {
        console.error('Error al actualizar el libro:', error);
      }
    });
  }
}