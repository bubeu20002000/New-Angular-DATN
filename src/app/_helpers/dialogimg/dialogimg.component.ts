import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogimg',
  templateUrl: './dialogimg.component.html',
  styleUrls: ['./dialogimg.component.css']
})
export class DialogimgComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogimgComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
