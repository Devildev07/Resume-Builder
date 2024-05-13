import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/modals/dialog-box/dialog-box.component';

export const authGaurdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthServiceService);
  const dialog = inject(MatDialog);

  if (authService.isUsersignin) {
    return true;
  } else {
    dialog.open(DialogBoxComponent, {
      backdropClass: 'backdrop-blur',
      width: '400px',
      height: 'auto',
      panelClass: 'rounded-lg',
      data: {
        message: 'Please login to continue.',
        title: 'Login alert',
        dialogCss: 'danger-dialog',
        buttonText: 'OK',
        buttonCss: 'danger-dialog-btn',
      },
    });
    router.navigate(['/home']);
    return false;
  }
};
