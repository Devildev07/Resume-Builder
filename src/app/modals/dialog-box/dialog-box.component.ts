import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css',
})
export class DialogBoxComponent {
  dialogMessage: any;
  dialogTitle: any;
  dialogButtonText: any;
  dialogButtonCss: any;
  dialogCss: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      message: any;
      title: any;
      buttonText: any;
      buttonCss: any;
      dialogCss: any;
    }
  ) {
    this.dialogMessage = data.message;
    this.dialogTitle = data.title;
    this.dialogButtonText = data.buttonText;
    this.dialogButtonCss = data.buttonCss;
    this.dialogCss = data.dialogCss;
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
}
