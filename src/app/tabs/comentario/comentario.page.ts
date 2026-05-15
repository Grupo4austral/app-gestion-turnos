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
  AlertController,
  ToastController
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
import { supabase } from '../../supabase';

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
  userId: string | null = null;

  constructor(
    private db: DatabaseService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    addIcons({
      addCircleOutline,
      saveOutline,
      closeOutline,
      createOutline,
      trashOutline
    });
  }

  async ngOnInit() {
    const { data: { session } } = await supabase.auth.getSession();
    this.userId = session?.user?.id ?? null;
    this.cargarComentarios();
  }

  async cargarComentarios() {
    try {
      this.comentarios = await this.db.getAll<Comentario>('comentario', { orderBy: 'fecha_comentario', ascending: false });
    } catch (e) {
      console.error('Error al cargar comentarios', e);
    }
  }

  async guardarComentario() {
    if (!this.nuevoComentario.comentario?.trim()) return;
    try {
      const record: Record<string, unknown> = {
        comentario: this.nuevoComentario.comentario,
        descripcion: this.nuevoComentario.descripcion || null,
        puntuacion: this.nuevoComentario.puntuacion,
        usuario_id: this.userId
      };
      await this.db.insert('comentario', record);
      this.nuevoComentario = { comentario: '', descripcion: '', puntuacion: 5 };
      await this.mostrarToast('✅ Comentario guardado', 'success');
      this.cargarComentarios();
    } catch (e: any) {
      console.error('Error al guardar', e);
      await this.mostrarToast('❌ Error al guardar: ' + (e?.message || 'Error desconocido'), 'danger');
    }
  }

  async mostrarToast(mensaje: string, color: string = 'success') {
    const toast = await this.toastCtrl.create({ message: mensaje, duration: 2500, color });
    await toast.present();
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
          descripcion: this.editando.descripcion || null,
          puntuacion: this.editando.puntuacion,
        },
        'id_comentario'
      );
      this.editando = null;
      await this.mostrarToast('✅ Comentario actualizado', 'success');
      this.cargarComentarios();
    } catch (e: any) {
      console.error('Error al actualizar', e);
      await this.mostrarToast('❌ Error al actualizar: ' + (e?.message || 'Error desconocido'), 'danger');
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
              await this.mostrarToast('🗑️ Comentario eliminado', 'medium');
              this.cargarComentarios();
            } catch (e: any) {
              console.error('Error al eliminar', e);
              await this.mostrarToast('❌ Error al eliminar: ' + (e?.message || 'Error desconocido'), 'danger');
            }
          },
        },
      ],
    });
    await alert.present();
  }
}


