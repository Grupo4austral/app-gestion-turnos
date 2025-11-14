export interface Comentario {
  id?: number;
  titulo: string;
  descripcion: string;
  categoria?: string;
  prioridad?: 'baja' | 'media' | 'alta';
  estado?: 'pendiente' | 'en_proceso' | 'completado';
  fecha_creacion?: string;
  fecha_actualizacion?: string;
  usuario_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ComentarioStats {
  total: number;
  por_categoria: { [key: string]: number };
  por_prioridad: { [key: string]: number };
  por_estado: { [key: string]: number };
}
