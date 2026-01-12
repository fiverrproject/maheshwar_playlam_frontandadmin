import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globle } from '../../../core/services/globle';
import { Api } from '../../../core/services/api';

@Component({
  selector: 'app-categorie',
  standalone: false,
  templateUrl: './categorie.html',
  styleUrl: './categorie.scss',
})
export class Categorie {

  all_data: any;
  categorie_ID: any = false;
  categorie_Form!: FormGroup;
  pagingConfig = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  is_loader: boolean = true;

  categorieLogs: any = {};


  constructor(public api_s: Api,
    private cf: ChangeDetectorRef,
    public globle_s: Globle,
    private fb: FormBuilder,) {
    this.get_data({ page: 1 });

    this.categorie_Form = this.fb.group({
      id: '',
      name: ['', Validators.required],
      serial_number: ['', Validators.required]
    });
  }

  get_data(body: any) {
    this.is_loader = true;
    const page = body.page || 1;
    this.pagingConfig.currentPage = page;

    this.api_s.postApi(`categories-get?page=${page}`, '').then((resp: any) => {
      this.categorieLogs[page] = resp.data;
      this.all_data = resp.data;

      this.pagingConfig.totalItems = resp.total_record;
      this.is_loader = false;

      this.cf.detectChanges();
    }, (err: any) => {
      //  this.isLoading = false;
    });
  }



  pageChanged(page: number) {
    this.pagingConfig.currentPage = page;

    if (this.categorieLogs[page]) {
      this.all_data = this.categorieLogs[page];
      this.cf.detectChanges();
    } else {
      this.get_data({ page });
    }
  }

  update(item: any) {
    this.globle_s.modalOpen('categorie_Modal');
    console.log("::", item);
    this.categorie_ID = true;
    this.categorie_Form.patchValue({
      id: item.id,
      name: item.name,
      serial_number: item.serial_number
    });
  }

  opnModal(modalName: string) {
    this.globle_s.modalOpen(modalName);
  }

  dismissModal(modalName: string) {
    this.globle_s.modalDismiss(modalName);
    this.categorie_ID = null;
  }

  onSubmit() {
    if (this.categorie_Form.invalid) {
      this.categorie_Form.markAllAsTouched();
      return;
    }


    // const formData = new FormData();

    // formData.append('name', this.categorie_Form.value.name);
    // formData.append('position', this.categorie_Form.value.email);

    // // if (this.categorie_Form.value.profile) {
    // //   formData.append('profile', this.categorie_Form.value.profile);
    // // }

    // if (this.categorie_Form) {
    //   formData.append('id', this.categorie_Form.value.id);
    // }

    if (this.categorie_ID != true) {

      this.api_s.postApi('categories-add', this.categorie_Form.value).then((resp: any) => {
        this.categorieLogs = {};

        this.pagingConfig.currentPage = 1;
        this.get_data({ page: this.pagingConfig.currentPage });

        this.all_data.unshift(resp.data);

        this.dismissModal('categorie_Modal');
        this.categorie_Form.reset();
        this.categorie_ID = null;

        // this.globle_s.showToastr('Success', 'Form SuccessFully Site Config');
      }, (err: any) => {
        // this.globle_s.showToastr('Error', 'Not Form Submit');
      });
    } else {
      this.api_s.postApi('categories-edit', this.categorie_Form.value).then((resp: any) => {

        const index = this.all_data.findIndex(
          (x: any) => x.id === this.categorie_Form.value.id
        );

        if (index !== -1) {
          this.all_data[index] = resp.data;
        }

        this.dismissModal('categorie_Modal');
        this.categorie_Form.reset();
        this.categorie_ID = null;
        this.globle_s.showToastr('Success', resp.message);
      }, (err: any) => {
        this.globle_s.showToastr('Error', 'Not Form Submit');
      });
    }
  }

  delete(item: any) {
    // 
    this.globle_s.confirmAlert(
      'Are you sure you want to delete this product?',
      'warning'
    ).then((result: any) => {
      if (result) {
        this.api_s.postApi('categories-delete', { id: item.id }).then((resp: any) => {
          if (resp && resp.status) {
            this.globle_s.showToastr('Success', resp?.message);
            this.all_data = this.all_data.filter(
              (obj: any) => obj.id !== item.id
            );
            this.cf.detectChanges();

          } else {
            this.globle_s.showToastr('Error', resp?.message);
          }
        });
      }
    });

  }



}
