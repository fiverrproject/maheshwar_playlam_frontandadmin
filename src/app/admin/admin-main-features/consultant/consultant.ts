import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../../../core/services/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globle } from '../../../core/services/globle';

@Component({
  selector: 'app-consultant',
  standalone: false,
  templateUrl: './consultant.html',
  styleUrl: './consultant.scss',
})
export class Consultant {


  pagingConfig = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  consultantLogs: any = {};


  is_loader = false;
  consultant_Form!: FormGroup;
  consultant_ID: any = false;
  all_data: any;
  image_folder :any;
  constructor(public api_s: Api,
    private cf: ChangeDetectorRef,
    public globle_s: Globle,
    private fb: FormBuilder,) {
    this.get_data({ page: 1 });

    this.consultant_Form = this.fb.group({
      id: '',
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', Validators.required],
      profile: ['']
    });

    this.image_folder = this.api_s.imageBaseUrl + 'profile/';
  }

  get_data(body: any) {
    this.is_loader = true;
    const page = body.page || 1;

    // if (this.pageCache[page]) {
    //   this.all_data = this.pageCache[page];
    //   this.pagingConfig.currentPage = page;
    //   return;
    // }

    
    this.pagingConfig.currentPage = page;

    this.api_s.postApi(`consonantal-get?page=${page}`, '').then(
      (resp: any) => {

       
        this.consultantLogs[page] = resp.data;
        this.all_data = resp.data;

        this.pagingConfig.totalItems = resp.total_record;
        this.is_loader = false;
        this.cf.detectChanges();
      },
      () => {
        this.is_loader = false;
      }
    );
  }


  pageChanged(page: number) {
    this.pagingConfig.currentPage = page;

    if (this.consultantLogs[page]) {
      this.all_data = this.consultantLogs[page];
      this.cf.detectChanges();
    } else {
      this.get_data({ page });
    }
  }

  opnModal(modalName: string) {
    this.globle_s.modalOpen(modalName);
  }

  dismissModal(modalName: string) {
    this.globle_s.modalDismiss(modalName);
    this.consultant_ID = null;
    this.imagePreview = null;
    this.consultant_Form.reset();
  }


  imagePreview: any = null;

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // patch value for form
      this.consultant_Form.patchValue({ profile: file });

      // create image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.cf.detectChanges(); // base64 string
      };
      reader.readAsDataURL(file);
        
    }
  }


  update(item: any) {
    this.globle_s.modalOpen('consultant_Modal');
    this.consultant_ID = true;
    this.consultant_Form.patchValue({
      id: item.id,
      name: item.name,
      email: item.email,
      designation: item.designation
    });

    if (item.profile) {
      this.imagePreview = this.image_folder + item.profile;

    } else {
      this.imagePreview = null;
    }
  }

  delete(item: any) {
    // this.api_s.postApi('consonantal-delete', { id: item.id }).then((resp: any) => {
    //   // this.inquiry_data = resp.data;
    //   //     this.inquiry_data = this.inquiry_data.filter(
    //   //   (x: any) => x.id !== item
    //   // );
    //   this.get_data(this.pagingConfig.currentPage);
    // }, (err: any) => {
    //   //  this.isLoading = false;
    // });

    this.globle_s.confirmAlert(
      'Are you sure you want to delete this product?',
      'warning'
    ).then((result: any) => {

         if (!result) {
        return;
      }
      this.is_loader = true;

      if (result) {
        this.api_s.postApi('consonantal-delete', { id: item.id }).then((resp: any) => {
          if (resp && resp.status) {
            this.globle_s.showToastr('Success', resp?.message);
            this.all_data = this.all_data.filter(
              (obj: any) => obj.id !== item.id
            );
            // this.cf.detectChanges();

            
              this.is_loader = false;
              this.cf.detectChanges();
            
            // this.get_data(this.pagingConfig.currentPage);

          } else {
            this.globle_s.showToastr('Error', resp?.message);
          }
        });
      }
    });

  }

  onSubmit() {
    if (this.consultant_Form.invalid) {
      this.consultant_Form.markAllAsTouched();
      return;
    }


    const formData = new FormData();

    formData.append('name', this.consultant_Form.value.name);
    formData.append('email', this.consultant_Form.value.email);
    formData.append('designation', this.consultant_Form.value.designation);

    if (this.consultant_Form.value.profile) {
      formData.append('profile', this.consultant_Form.value.profile);
    }

    if (this.consultant_Form) {
      formData.append('id', this.consultant_Form.value.id);
    }

    if (this.consultant_ID != true) {

      this.api_s.postApi('consonantal-add', formData).then((resp: any) => {
        this.all_data.unshift(resp.data);

        this.consultantLogs = {};

        this.pagingConfig.currentPage = 1;
        this.get_data({ page: this.pagingConfig.currentPage });

        this.all_data.unshift(resp.data);

        this.dismissModal('consultant_Modal');
        this.consultant_Form.reset();
        this.consultant_ID = null;
        this.cf.detectChanges();

      }, (err: any) => {
      });
    } else {
      this.api_s.postApi('consonantal-edit', formData).then((resp: any) => {

        const index = this.all_data.findIndex(
          (x: any) => x.id === this.consultant_Form.value.id
        );

        if (index !== -1) {
          this.all_data[index] = resp.data;
        }

        this.dismissModal('consultant_Modal');
        this.consultant_Form.reset();
        this.consultant_ID = null;
        // this.globle_s.showToastr('Success', 'Form SuccessFully Site Config');
      }, (err: any) => {
        // this.globle_s.showToastr('Error', 'Not Form Submit');
      });
    }


    // API call here



    // 
  }


}
