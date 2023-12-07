import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (localStorage.getItem('userId')) {
    return authService.profile().pipe(
      map(res => {
        if(res) {
          return true;
        }
        router.navigate(['/signin']);
        return false;
      },
      catchError(err => {
        router.navigate(['/signin']);
        console.log(err);
        return of(false);
      })
    ));
  }

  router.navigate(['/signin']);
  return of(false);
};
