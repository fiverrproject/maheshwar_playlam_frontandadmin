import { ChangeDetectorRef, Component } from '@angular/core';
import { Globle } from '../../../core/services/globle';
import { Api } from '../../../core/services/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lam-pdf',
  standalone: false,
  templateUrl: './lam-pdf.html',
  styleUrl: './lam-pdf.scss',
})
export class LamPdf {


  pagingConfig = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  isPageLoading: boolean = true;
  PDF_Logs: any = {};
  PDF_List: any[] = [];
  pdfForm!: FormGroup;


  imagePreview: string | null = null;
  existingPdfUrl: string | null = null;
  selectedImage!: File;
  selectedPdf!: File;
  submitted = false;

  constructor(private cf: ChangeDetectorRef,
    public api_s: Api,
    public fb: FormBuilder,
    public globle_s: Globle) {
    this.getPDF({ page: 1 });

    this.pdfForm = this.fb.group({
      id: [''],
      Title: ['', Validators.required],
      image: [null],
      pdf: [null],
    });

  }

  getPDF(body: any) {
    const page = body.page || 1;

    this.isPageLoading = true;
    this.api_s.postApi(`lam-pdf-get?page=${page}`, '').then((resp: any) => {
      if (resp && resp.status) {

        const PDF_data = resp.data

        this.PDF_Logs[page] = PDF_data;
        this.PDF_List = PDF_data;
        console.log(":::data", this.PDF_List);

        this.pagingConfig.totalItems = resp.total_record;
        this.cf.detectChanges();
      } else {
        this.globle_s.showToastr('Error', resp.message);
      }

      this.isPageLoading = false;
      this.cf.detectChanges(); // ✅ SAFE

    }, () => {

      this.isPageLoading = false; // ✅ SAFE

      this.globle_s.showToastr('Error', 'Something went wrong. Please try again.');
    });
  }

  pageChanged(page: number) {
    this.pagingConfig.currentPage = page;

    if (this.PDF_Logs[page]) {
      this.PDF_List = this.PDF_Logs[page];
      this.cf.detectChanges();
    } else {
      this.getPDF({ page });
    }
  }

  PDFModelOpen(key: string, data: any) {

    console.log(":::edit", data);
    if (key == 'edit') {
      this.globle_s.modalOpen('PDFModelOpen');
      this.pdfForm.patchValue({
        id: data.id,
        Title: data.Title,
        image: data.image,
        pdf: data.pdf
      });

      this.imagePreview =
        this.api_s.imageBaseUrl + 'pdf_image/' + data.image;

      this.existingPdfUrl =
        this.api_s.imageBaseUrl + 'pdfPath/' + data.pdf;
      console.log(":::edit pdf", this.existingPdfUrl);
    } else {
      this.globle_s.modalOpen('PDFModelOpen');
      this.pdfForm.reset();
      this.imagePreview = null;
      this.existingPdfUrl = null;
    }

  }

  PDF_close() {
    this.globle_s.modalDismiss('PDFModelOpen');
    const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    fileInputs.forEach(input => input.value = '');
    this.pdfForm.reset();
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedImage = file;
    this.pdfForm.patchValue({ image: file });

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.cf.detectChanges();
    };

    reader.readAsDataURL(file);

  }

  /* PDF SELECT */
  onPdfSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedPdf = file;
    this.pdfForm.patchValue({ pdf: file });
  }

  /* SUBMIT */
  submit() {
    this.submitted = true;

    if (this.pdfForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('Title', this.pdfForm.value.Title);
    formData.append('image', this.pdfForm.value.image);
    formData.append('pdf', this.pdfForm.value.pdf);

    console.log('Form Submitted', this.pdfForm.value);

    //Edit Form
    if (this.pdfForm.value.id) {

      formData.append('id', this.pdfForm.value.id);
      this.api_s.postApi('lam-pdf-edit', formData).then((resp: any) => {
        if (resp && resp.status) {

          this.PDF_Logs = {};

          this.pagingConfig.currentPage = 1;
          this.getPDF({ page: this.pagingConfig.currentPage });
          this.PDF_List = this.PDF_List.map(p =>
            p.id === this.pdfForm.value.id ? resp.data : p
          );

        }
        this.isPageLoading = false;
        this.globle_s.showToastr('Success', resp.message);
        this.PDF_close();

        this.pagingConfig.totalItems = resp.total_record;
        this.cf.detectChanges();



        this.cf.detectChanges(); // ✅ SAFE

      }, () => {

        this.submitted = false; // ✅ SAFE

        this.globle_s.showToastr('Error', 'Something went wrong. Please try again.');
      });
    } else {


      //ADD Form
      this.api_s.postApi('lam-pdf-add', formData).then((resp: any) => {
        if (resp && resp.status) {

          this.PDF_Logs = {};

          this.pagingConfig.currentPage = 1;
          this.getPDF({ page: this.pagingConfig.currentPage });
          this.PDF_List.unshift(resp.data);

        }
        this.isPageLoading = false;
        this.globle_s.showToastr('Success', resp.message);
        this.PDF_close();

        this.pagingConfig.totalItems = resp.total_record;
        this.cf.detectChanges();



        this.cf.detectChanges(); // ✅ SAFE

      }, () => {

        this.submitted = false; // ✅ SAFE

        this.globle_s.showToastr('Error', 'Something went wrong. Please try again.');
      });
    }


    const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    fileInputs.forEach(input => input.value = '');
    this.pdfForm.reset();

    // 👉 call API here
  }

  //Remove
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

      this.api_s.postApi('lam-pdf-delete', { id: item.id }).then(
        (resp: any) => {

          if (resp && resp.status) {
            this.globle_s.showToastr('Success', resp?.message);
            this.PDF_List = this.PDF_List.filter(
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
