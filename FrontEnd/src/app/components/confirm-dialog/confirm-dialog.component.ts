import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})


export class ConfirmDialogComponent implements OnInit{
  private logged;

  constructor(private router : Router,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    ngOnInit(){
      if(localStorage.getItem("logged")== null){
        this.logged = false;
      }
    }

    onConfirm(): void {
      // Close the dialog, return true
      this.dialogRef.close(true);
    }

    gotologging(): void {
      // Close the dialog, return true
      this.dialogRef.close(false);
      this.router.navigate(['/login']);
    }
  
    onDismiss(): void {
      // Close the dialog, return false
      this.dialogRef.close(false);
    }
}

export interface DialogData {
  title: string;
  comment: string;
}




