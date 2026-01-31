import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api } from '../../../core/services/api';
import { Globle } from '../../../core/services/globle';

@Component({
  selector: 'app-testimonial',
  standalone: false,
  templateUrl: './testimonial.html',
  styleUrl: './testimonial.scss',
})
export class Testimonial {

  pagingConfig = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  isPageLoading: boolean = true;
  testi_Logs: any = {};
  testi_List: any[] = [];
  testiForm!: FormGroup;


  imagePreview: any | null = null;
  selectedImage!: File;
  selectedPdf!: File;
  submitted = false;

  constructor(private cf: ChangeDetectorRef,
    public api_s: Api,
    public fb: FormBuilder,
    public globle_s: Globle) {

    this.get_testimonial({ page: 1 });

    this.testiForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      role: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });

  }

  get_testimonial(body: any) {
    const page = body.page || 1;

    this.isPageLoading = true;
    this.api_s.postApi(`testimonial-page-get?page=${page}`, '').then((resp: any) => {
      if (resp && resp.status) {

        const PDF_data = resp.data

        this.testi_Logs[page] = PDF_data;
        this.testi_List = PDF_data;
        console.log(":::data", this.testi_List);

        this.pagingConfig.totalItems = resp.total_record;
        this.cf.detectChanges();
      } else {
        this.globle_s.showToastr('Error', resp.message);
      }

      this.isPageLoading = false;
      this.cf.detectChanges(); // ✅ SAFE

    }, () => {

      this.isPageLoading = false; // ✅ SAFE

      // this.globle_s.showToastr('Error', 'Something went wrong. Please try again.');
    });
  }

  pageChanged(page: number) {
    this.pagingConfig.currentPage = page;

    if (this.testi_Logs[page]) {
      this.testi_List = this.testi_Logs[page];
      this.cf.detectChanges();
    } else {
      this.get_testimonial({ page });
    }
  }

  team_ModelOpen(key: string, data: any) {

    console.log(":::edit", data);
    if (key == 'edit') {
      this.globle_s.modalOpen('teamodelOpen');
      this.testiForm.patchValue({
        id: data.id,
        name: data.name,
        image: data.image,
        role: data.role,
        description: data.description
      });

      this.imagePreview =
        this.api_s.imageBaseUrl + 'testimonial/' + data.image;

    } else {
      this.globle_s.modalOpen('teamodelOpen');
      this.testiForm.reset();
      this.imagePreview = null;
      this.cf.detectChanges();
    }

  }

  team_close() {
    this.globle_s.modalDismiss('teamodelOpen');
    const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    fileInputs.forEach(input => input.value = '');
    this.testiForm.reset();

  }


  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {

      this.testiForm.patchValue({ image: file });
      // this.testiForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.cf.detectChanges();
      };

      reader.readAsDataURL(file);
    }
  }
  // @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  submit() {
    this.submitted = true;

    if (this.testiForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.testiForm.value.name);
    formData.append('image', this.testiForm.value.image);
    formData.append('role', this.testiForm.value.role);
    formData.append('description', this.testiForm.value.description);
    
    console.log('Form Submitted', this.testiForm.value);

    //Edit Form
    if (this.testiForm.value.id) {

      formData.append('id', this.testiForm.value.id);
      this.api_s.postApi('testimonial-edit', formData).then((resp: any) => {
        if (resp && resp.status) {

          this.testi_Logs = {};

          this.pagingConfig.currentPage = 1;
          this.get_testimonial({ page: this.pagingConfig.currentPage });
          this.testi_List = this.testi_List.map(p =>
            p.id === this.testiForm.value.id ? resp.data : p
          );

        }
        this.isPageLoading = false;
        this.globle_s.showToastr('Success', resp.message);
        this.team_close();

        this.pagingConfig.totalItems = resp.total_record;
        this.cf.detectChanges();



        this.cf.detectChanges(); // ✅ SAFE

      }, () => {

        this.submitted = false; // ✅ SAFE

        this.globle_s.showToastr('Error', 'Something went wrong. Please try again.');
      });
    } else {


      //ADD Form
      this.api_s.postApi('testimonial-add', formData).then((resp: any) => {
        if (resp && resp.status) {

          this.testi_Logs = {};

          this.pagingConfig.currentPage = 1;
          this.get_testimonial({ page: this.pagingConfig.currentPage });
          this.testi_List.unshift(resp.data);

        }
        this.isPageLoading = false;
        this.globle_s.showToastr('Success', resp.message);
        this.team_close();

        this.pagingConfig.totalItems = resp.total_record;
        this.cf.detectChanges();



        this.cf.detectChanges(); // ✅ SAFE

      }, () => {

        this.submitted = false; // ✅ SAFE

        this.globle_s.showToastr('Error', 'Something went wrong. Please try again.');
      });
    }


    this.testiForm.reset();
    const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    fileInputs.forEach(input => input.value = '');
  }

   delete(item: any) {
    this.globle_s.confirmAlert(
      'Are you sure you want to delete this product?',
      'warning'
    ).then((result: any) => {

      if (!result) {
        return;
      }

      // ✅ show loader ONLY after confirmation
      this.isPageLoading = true;

      this.api_s.postApi('testimonial-delete', { id: item.id }).then(
        (resp: any) => {

          if (resp && resp.status) {
            this.globle_s.showToastr('Success', resp?.message);
            this.testi_List = this.testi_List.filter(
              (obj: any) => obj.id !== item.id
            );
            this.cf.detectChanges();
          } else {
            this.globle_s.showToastr('Error', resp?.message);
          }

          // ✅ hide loader safely
          setTimeout(() => {
            this.isPageLoading = false;
            this.cf.detectChanges();
          });

        },
        () => {
          setTimeout(() => {
            this.isPageLoading = false;
          });
        }
      );
    });

  }

}
