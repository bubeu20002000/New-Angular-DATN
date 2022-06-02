import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Infoorder } from '../infoorder';

@Component({
  selector: 'app-dialoginfoorder',
  templateUrl: './dialoginfoorder.component.html',
  styleUrls: ['./dialoginfoorder.component.css']
})
export class DialoginfoorderComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Infoorder) { }

  ngOnInit(): void {
  }

}
