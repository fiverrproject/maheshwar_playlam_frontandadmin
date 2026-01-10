import { ChangeDetectorRef, Component } from '@angular/core';
import { Globle } from '../../../core/services/globle';
import { Api } from '../../../core/services/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var window: any;
@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList {
  pagingConfig = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  inquiry_data: any[] = [];
  is_loader: boolean = true;

  constructor(
    private cf: ChangeDetectorRef,
    private api_s: Api,
    private globle_s:Globle
  ) { }

  ngOnInit() {
    this.get_data(1);
  }

  get_data(page: number = 1) {
    this.is_loader = true;
    this.pagingConfig.currentPage = page;

    this.api_s.postApi(`inquiry-get?page=${page}`, '').then(
      (resp: any) => {

        this.inquiry_data = resp.data;
        this.pagingConfig.totalItems = resp.total_record;
        this.is_loader = false;

        this.cf.detectChanges();
      },
      () => {
        setTimeout(() => {
          this.is_loader = false;
        });
      }
    );
  }

  pageChanged(page: number) {
    this.get_data(page);
  }

  delete(itemId: number) {
    // this.api_s.postApi('inquiry-delete', { id: itemId }).then(() => {
    //   this.get_data(this.pagingConfig.currentPage);
    // });

    this.globle_s.confirmAlert(
      'Are you sure you want to delete this product?',
      'warning'
    ).then((result: any) => {
      if (result) {
        this.api_s.postApi('inquiry-delete', { id : itemId }).then((resp: any) => {
          if (resp && resp.status) {
            this.globle_s.showToastr('Success', resp?.message);

            this.get_data(this.pagingConfig.currentPage);
    

          } else {
            this.globle_s.showToastr('Error', resp?.message);
          }
        });
      }
    });

  }

}
