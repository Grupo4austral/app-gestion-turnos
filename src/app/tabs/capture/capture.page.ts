import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.page.html',
  styleUrls: ['./capture.page.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonicModule]
})
export class CapturePage implements OnInit {
  servicios: any[] = [];
  servicio: any = { nombre: '', descripcion: '', duracion_minutos: null, precio: null };
  isEditing = false;
  servicioEditandoId: number | null = null;
  isLoading = false; // Estado de carga

  constructor(
    private db: DatabaseService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.cargarServicios();
  }

  async cargarServicios() {
    this.isLoading = true;
    try {
      this.servicios = await this.db.getAll('servicio');
    } catch (error) {
      console.error('Error al cargar servicios:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async agregarServicio() {
    if (!this.servicio.nombre || !this.servicio.duracion_minutos || !this.servicio.precio) {
      await this.mostrarToast('Completa todos los campos obligatorios', 'warning');
      return;
    }
    await this.db.insert('servicio', this.servicio);
    await this.mostrarToast('Servicio agregado con éxito ✅', 'success');
    this.servicio = { nombre: '', descripcion: '', duracion_minutos: null, precio: null };
    await this.cargarServicios();
  }

  editarServicio(servicio: any) {
    this.isEditing = true;
    this.servicioEditandoId = servicio.id_servicio;
    this.servicio = { ...servicio };
  }

  async guardarEdicion() {
    if (!this.servicioEditandoId) return;
    await this.db.update('servicio', this.servicioEditandoId, this.servicio, 'id_servicio');
    await this.mostrarToast('Servicio actualizado con éxito ✅', 'success');
    this.isEditing = false;
    this.servicioEditandoId = null;
    this.servicio = { nombre: '', descripcion: '', duracion_minutos: null, precio: null };
    await this.cargarServicios();
  }

  cancelarEdicion() {
    this.isEditing = false;
    this.servicioEditandoId = null;
    this.servicio = { nombre: '', descripcion: '', duracion_minutos: null, precio: null };
  }

  async eliminarServicio(id: number) {
    const alert = await this.alertCtrl.create({
      header: '¿Confirmar eliminación?',
      message: '¿Seguro que deseas eliminar este servicio? Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.db.delete('servicio', id, 'id_servicio');
            await this.mostrarToast('Servicio eliminado con éxito', 'success');
            await this.cargarServicios();
          }
        }
      ]
    });
    await alert.present();
  }

  async mostrarToast(mensaje: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      color: color
    });
    await toast.present();
  }
}