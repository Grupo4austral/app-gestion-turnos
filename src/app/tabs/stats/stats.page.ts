import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

const supabase = createClient(
  environment.supabase.url,
  environment.supabase.anonKey
);

@Component({
  selector: 'app-stats',
  standalone: true,
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StatsPage {

  id_turno: number | null = null;

  servicio: string = '';
  prestador: string = '';
  estado: string = '';

  fecha: string = '';
  hora: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async ionViewWillEnter() {
    this.route.queryParams.subscribe(async params => {
      this.id_turno = params['id_turno'];
      if (this.id_turno) {
        await this.cargarTurno();
      }
    });
  }

  async cargarTurno() {
    const { data, error } = await supabase
      .from('v_turnos_detalle')
      .select('*')
      .eq('id_turno', this.id_turno)
      .single();

    if (!error && data) {
      this.servicio = data.servicio;
      this.prestador = data.prestador;
      this.estado = data.estado;

      const fechaCompleta = new Date(data.inicio);
      this.fecha = fechaCompleta.toISOString().slice(0, 10);
      this.hora = fechaCompleta.toTimeString().slice(0, 5);
    }
  }

  async guardarCambios() {
    const nuevaFecha = `${this.fecha}T${this.hora}:00`;

    const { error } = await supabase
      .from('turno')
      .update({
        inicio: nuevaFecha,
        estado: this.estado
      })
      .eq('id_turno', this.id_turno);

    if (error) {
      console.error(error);
      return;
    }

    this.router.navigate(['/tabs/home']);
  }
}
