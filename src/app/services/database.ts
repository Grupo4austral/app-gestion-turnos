import { Injectable } from '@angular/core';
import { supabase } from '../supabase';

export interface GetAllOptions {
  orderBy?: string;
  ascending?: boolean;
  filter?: { column: string; value: string | number | boolean };
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  async getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  async getAll<T = Record<string, unknown>>(table: string, options?: GetAllOptions): Promise<T[]> {
    let query = supabase.from(table).select('*');

    if (options?.filter) {
      query = query.eq(options.filter.column, options.filter.value);
    }

    if (options?.orderBy) {
      query = query.order(options.orderBy, { ascending: options.ascending ?? true });
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as unknown as T[];
  }

  async insert(table: string, record: Record<string, unknown>): Promise<Record<string, unknown>> {
    const { data, error } = await supabase
      .from(table)
      .insert([record])
      .select()
      .single();
    if (error) throw error;
    return data as Record<string, unknown>;
  }

  async update(
    table: string,
    id: number | string,
    updates: Record<string, unknown>,
    pkColumn: string = 'id'
  ): Promise<Record<string, unknown>> {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq(pkColumn, id)
      .select()
      .single();
    if (error) throw error;
    return data as Record<string, unknown>;
  }

  async delete(table: string, id: number | string, pkColumn: string = 'id'): Promise<void> {
    const { error } = await supabase.from(table).delete().eq(pkColumn, id);
    if (error) throw error;
  }
}
