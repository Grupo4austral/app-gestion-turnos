import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonTextarea,
  IonInput,
  IonRange,
  IonButton,
  IonIcon,
  IonList,
  IonListHeader,
  IonButtons,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  saveOutline,
  closeOutline,
  createOutline,
  trashOutline
} from 'ionicons/icons';
import { DatabaseService } from '../../services/database';

interface Comentario {
  id_comentario?: number;
  comentario: string;
  descripcion?: string;
  fecha_comentario?: string;
  puntuacion?: number;
  usuario_id?: string;
}

@Component({
  selector: 'app-comentario',
  standalone: true,
  templateUrl: './comentario.page.html',
  styleUrls: ['./comentario.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonTextarea,
    IonInput,
    IonRange,
    IonButton,
    IonIcon,
    IonList,
    IonListHeader,
    IonButtons
  ]
})
export class ComentarioPage implements OnInit {
  comentarios: Comentario[] = [];
  nuevoComentario: Comentario = { comentario: '', descripcion: '', puntuacion: 5 };
  editando: Comentario | null = null;
  userId: string = '';

  constructor(private db: DatabaseService, private alertCtrl: AlertController) {
    addIcons({
      addCircleOutline,
      saveOutline,
      closeOutline,
      createOutline,
      trashOutline
    });
  }

  async ngOnInit() {
    const user = await this.db.getUser();
    this.userId = user?.id || '';
    this.cargarComentarios();
  }

  async cargarComentarios() {
    try {
      this.comentarios = await this.db.getAll('comentario', 'fecha_comentario', false);
    } catch (e) {
      console.error('Error al cargar comentarios', e);
    }
  }

  async guardarComentario() {
    if (!this.nuevoComentario.comentario?.trim()) return;
    try {
      await this.db.insert('comentario', { ...this.nuevoComentario, usuario_id: this.userId });
      this.nuevoComentario = { comentario: '', descripcion: '', puntuacion: 5 };
      this.cargarComentarios();
    } catch (e) {
      console.error('Error al guardar', e);
    }
  }

  editar(c: Comentario) {
    this.editando = { ...c };
  }

  async actualizarComentario() {
    if (!this.editando?.id_comentario) return;
    try {
      await this.db.update(
        'comentario',
        this.editando.id_comentario,
        {
          comentario: this.editando.comentario,
          descripcion: this.editando.descripcion,
          puntuacion: this.editando.puntuacion,
        },
        'id_comentario' // PK real de la tabla
      );
      this.editando = null;
      this.cargarComentarios();
    } catch (e) {
      console.error('Error al actualizar', e);
    }
  }

  async eliminarComentario(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Deseás eliminar este comentario?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.db.delete('comentario', id, 'id_comentario');
              this.cargarComentarios();
            } catch (e) {
              console.error('Error al eliminar', e);
            }
          },
        },
      ],
    });
    await alert.present();
  }
}


