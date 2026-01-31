import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api } from '../../../core/services/api';
import { Globle } from '../../../core/services/globle';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

  inquiryForm!: FormGroup;
  inquiry_data: any;
  submitted = false;
  all_data: any
  constructor(
    public api_s: Api,
    private fb: FormBuilder,
    public globle_s: Globle,
    private cf: ChangeDetectorRef
  ) {

    this.get_data();
  }

  ngOnInit() {
    // Initialize the form with validation rules
    this.inquiryForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      subject: ['',],
      message: ['',]
    });
    this.api_s.updateMetaInfo(
      'Contact',
      'Have a question or need help choosing the right laminate? Fill out the form below and our team will get back to you shortly.',
      'contact'
    )
  }


  // get f() {
  //   return this.inquiryForm.controls;
  // }

  onSubmit() {
    this.submitted = true;

    if (this.inquiryForm.valid) {
      this.api_s.postApi('inquiry-add', this.inquiryForm.value).then((resp: any) => {
        this.inquiry_data = resp.data;
        this.submitted = false;
        this.inquiryForm.reset();
        this.globle_s.showToastr('Success', resp?.message);

      }, (err: any) => {
        this.globle_s.showToastr('Error', 'Not Found data');
        //  this.isLoading = false;
      });
    }

  }

  get_data() {
    this.api_s.postApi('site-config-get', '').then((resp: any) => {
      this.all_data = resp.data[0];
      this.cf.detectChanges();
    }, (err: any) => {
      //  this.isLoading = false;
    });
  }

}
