import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Infoprod } from '../infoprod';

@Component({
  selector: 'app-dialoginfoprod',
  templateUrl: './dialoginfoprod.component.html',
  styleUrls: ['./dialoginfoprod.component.css']
})
export class DialoginfoprodComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Infoprod) { }

  ngOnInit(): void {
  }

}
