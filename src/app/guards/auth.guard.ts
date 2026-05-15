import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { supabase } from '../supabase';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const { data: { session } } = await supabase.auth.getSession();
  return session ? true : router.createUrlTree(['/login']);
};
