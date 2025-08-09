import { Injectable, inject } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

// angular material
import { MatDialog } from '@angular/material/dialog';

// dialog component
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  // inject dependencies
  private dialog = inject(MatDialog);

  public open(title: string, content: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: 'sm',
      data: { title, content },
    });
    return dialogRef.afterClosed();
  }
}
