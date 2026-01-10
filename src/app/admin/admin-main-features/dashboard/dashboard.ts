import { ChangeDetectorRef, Component } from '@angular/core';
import { Globle } from '../../../core/services/globle';
import { Api } from '../../../core/services/api';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
dashboard: any = {};

  constructor(
    private apiservice: Api,
    private adminService: Globle,
     private cf: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getDashboard();
  }

  getDashboard() {
    this.apiservice.getApi('dashboard').then((resp: any) => {
      if (resp) {
        this.dashboard = resp; 
        this.cf.detectChanges();this.cf.detectChanges();      
      } else {
        this.adminService.showToastr('Error', resp.message);
      }
    }).catch(() => {
      this.adminService.showToastr('Error', 'Something went wrong. Please try again.');
    });
  }
}
