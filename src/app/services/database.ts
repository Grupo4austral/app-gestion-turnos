import { Injectable } from '@angular/core';
import { supabase } from '../supabase'; // tu conexión a Supabase

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  async getAll(table: string, orderBy?: string, ascending = true) {
    let q = supabase.from(table).select('*');
    if (orderBy) q = q.order(orderBy, { ascending });
    const { data, error } = await q;
    if (error) throw error;
    return data;
  }

  async insert(table: string, record: any) {
    const { data, error } = await supabase.from(table).insert([record]);
    if (error) throw error;
    return data;
  }

  // retrocompatible: si no pasás idField, asume 'id'
  async update(table: string, id: number, record: any, idField: string = 'id') {
    const { data, error } = await supabase.from(table).update(record).eq(idField, id);
    if (error) throw error;
    return data;
  }

  async delete(table: string, id: number, idField: string = 'id') {
    const { data, error } = await supabase.from(table).delete().eq(idField, id);
    if (error) throw error;
    return data;
  }

  async getUser() {
    const { data } = await supabase.auth.getUser();
    return data?.user ?? null;
  }
}

