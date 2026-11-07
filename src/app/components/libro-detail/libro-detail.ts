import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LibroService } from '../../services/libro';
import { Libro } from '../../models/libro';


@Component({
  selector: 'app-libro-detail',
  imports: [RouterLink],
  templateUrl: './libro-detail.html',
  styleUrl: './libro-detail.css',
})
export class LibroDetail implements OnInit {
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
        console.error('Error al obtener el libro:', error);
      }
    });
  }
}