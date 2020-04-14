import { Component, OnInit, Inject, Injectable } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import "@gooddata/react-components/styles/css/main.css";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  projectId: any
}
@Component({
  selector: 'app-drilling-pop-up',
  templateUrl: './drilling-pop-up.component.html',
  styleUrls: ['./drilling-pop-up.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class DrillingPopUpComponent  {

  constructor(
    public dialogRef: MatDialogRef<DrillingPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    close() {
      this.dialogRef.close();
    }
}
