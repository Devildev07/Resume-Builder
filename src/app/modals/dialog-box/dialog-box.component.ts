import {Component} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css'
})
export class DialogBoxComponent {
  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>) {
  }
}
