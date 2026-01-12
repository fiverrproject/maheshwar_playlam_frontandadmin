import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
declare let $: any;
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root',
})
export class Globle {

  constructor( private toastr: ToastrService,
     public router: Router
  ) {

  }

  modalOpen(modalName: string) {
    console.log("modalName>>", modalName);
    
    $('#' + modalName).modal("show");
  }

  modalDismiss(modalName: string) {
    (document.activeElement as HTMLElement)?.blur();
    $('#' + modalName).modal("hide");
  }


  logout() {
    localStorage.removeItem('lamcartadmin');
    this.router.navigate(['/lamcartAdmin/login']);
    this.showToastr('Success', 'logout successful');
  }

  //  showToastr(key: string, msg: string) {
  //     if (key === 'Success') {
  //        this.toastr.success(msg);
  //     } else {
  //        this.toastr.error(msg);
  //     }
  //  }

     showToastr(key: string, msg: string) {
    switch (key) {
      case 'Success':
        this.toastr.success(msg, 'Success');
        break;

      case 'Error':
        this.toastr.error(msg, 'Error');
        break;

      case 'Warning':
        this.toastr.warning(msg, 'Warning');
        break;

      case 'Info':
        this.toastr.info(msg, 'Info');
        break;

      default:
        this.toastr.show(msg);
        break;
    }
  }

  confirmAlert(text: string = '', icon: 'warning' | 'info' | 'success' | 'error' = 'warning'): Promise<boolean> {
    return swal({
      title: 'Are you sure?',
      text,
      icon,
      buttons: ['Cancel', 'Yes'],
      dangerMode: true,
    }).then((willConfirm) => !!willConfirm);
  }

}
