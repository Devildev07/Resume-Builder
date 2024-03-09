import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

export const authGaurdGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthServiceService);

    if (authService.isUserLogin) {
      return true;
    } else {
      router.navigate(['**']);
      return false;
    }
};
