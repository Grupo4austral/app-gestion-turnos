export interface Turno {
  id_turno?: number;
  usuario_id: string;
  id_servicio: number;
  id_prestador: number;
  id_sucursal: number;
  inicio: string;
  fin: string;
  estado?: 'pendiente' | 'confirmado' | 'cancelado' | 'completado' | 'c';
  notas?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Servicio {
  id: number;
  nombre: string;
  descripcion?: string;
  duracion_minutos?: number;
  precio?: number;
  activo?: boolean;
}

export interface Prestador {
  id: number;
  nombre: string;
  apellido: string;
  especialidad?: string;
  matricula?: string;
  email?: string;
  telefono?: string;
  activo?: boolean;
}

export interface Sucursal {
  id: number;
  nombre: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  activo?: boolean;
}

export interface TurnoStats {
  total: number;
  por_estado: { [key: string]: number };
  por_servicio: { [key: string]: number };
  por_sucursal: { [key: string]: number };
}
