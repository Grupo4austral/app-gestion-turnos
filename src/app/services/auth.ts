import { Injectable } from '@angular/core';
import { supabase } from '../supabase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private router: Router) {
    this.initializeAuth();
  }

  /**
   * Inicializa el estado de autenticación y escucha cambios
   */
  private initializeAuth() {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Login con email y contraseña
   */
  async login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected login error:', error);
      return { data: null, error };
    }
  }

  /**
   * Cierra sesión
   */
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      this.router.navigate(['/login']);
      
      return { error: null };
    } catch (error) {
      console.error('Logout error:', error);
      return { error };
    }
  }

}
