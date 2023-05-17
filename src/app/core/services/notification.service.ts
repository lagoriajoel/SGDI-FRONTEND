import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private snackBar: MatSnackBar) { }

    config: MatSnackBarConfig = {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }

    public openSnackBar(message: string) {
        this.snackBar.open(message, '', {
            duration: 5000
        });
    }

    success( msj : string): void {
        this.config['panelClass'] = ['notification', 'success'];
        this.snackBar.open(msj,'',this.config);
      }
}
