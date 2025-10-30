import { Component, OnInit } from '@angular/core';
import { ComentarioService } from '../../core/services/comentario.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.page.html',
  styleUrls: ['./comentario.page.scss']
})
export class ComentarioPage implements OnInit {
  comentarios: any[] = [];
  nuevoComentario: any = {
    comentario: '',
    descripcion: '',
    puntuacion: 1
  };
  editando: any = null;
  isLoading: boolean = false;
  searchTerm: string = '';

  constructor(private comentarioService: ComentarioService) {}

  ngOnInit() {
    this.cargarComentarios();
  }

  cargarComentarios() {
    this.isLoading = true;
    this.comentarioService.obtenerComentarios().subscribe(data => {
      this.comentarios = data;
      this.isLoading = false;
    });
  }

  guardarComentario() {
    if (this.nuevoComentario.comentario.trim()) {
      this.comentarioService.agregarComentario(this.nuevoComentario).subscribe(() => {
        this.cargarComentarios();
        this.nuevoComentario = { comentario: '', descripcion: '', puntuacion: 1 };
      });
    }
  }

  editarComentario(comentario: any) {
    this.editando = { ...comentario };
  }

  actualizarComentario() {
    this.comentarioService.actualizarComentario(this.editando).subscribe(() => {
      this.cargarComentarios();
      this.editando = null;
    });
  }

  eliminarComentario(id: number) {
    this.comentarioService.eliminarComentario(id).subscribe(() => {
      this.cargarComentarios();
    });
  }

  filtrarComentarios() {
    // Implementar lógica de filtrado
  }
}