import { Component, OnInit } from '@angular/core';
import SDK from "@gooddata/gooddata-js";
import { projectId, saveAsDashboard } from '../../../utils/fixtures.js';

@Component({
  selector: 'app-save-as-dashboard',
  templateUrl: './save-as-dashboard.component.html',
  styleUrls: ['./save-as-dashboard.component.css']
})

export class SaveAsDashboardComponent implements OnInit {
  public showMyMessage = false;
  loading = false;
  
  onClick = () => {
    this.loading = true;
    SDK.mdExt.saveDashboardAs(
      projectId, 
      saveAsDashboard, 
      { 
        copyKpi: false, 
        copyVisObj:false,
        name: "New Dashboard" + new Date().toISOString()
      }
    );
    setTimeout(() => {
      this.showMyMessage = true,
      this.loading = false
    }, 5000);
    this.autoCloseMessage();
  }

  autoCloseMessage() {
    setTimeout(() => {
      this.showMyMessage = false;
      this.loading = false;
    }, 10000)
    if (this.showMyMessage && this.loading == false) return
  }

  ngOnInit() {
  }

}
