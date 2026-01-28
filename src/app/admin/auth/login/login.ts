import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api } from '../../../core/services/api';
import { Globle } from '../../../core/services/globle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  loginForm!: FormGroup;
  registrationForm!: FormGroup;
  passwordVisible: boolean = false;
  constructor(public api_s: Api,
     public router: Router,
    private cf: ChangeDetectorRef,
    public globle_s: Globle,
    private fb: FormBuilder,) {


    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // this.registrationForm = this.fb.group({
    //   username: ['', [Validators.required]],
    //   password: ['', [Validators.required]],
    //   confirm_passd: ['', [Validators.required]]
    // }, {
    //   validator: this.passwordMatchValidator
    // });

  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirm_passd = form.get('confirm_passd');
    if (password?.value !== confirm_passd?.value) {
      confirm_passd?.setErrors({ passwordMismatch: true });
    } else {
      confirm_passd?.setErrors(null);
    }
  }

  // registrationSubmit() {
  //   if (this.registrationForm.valid) {
  //     const formData = this.registrationForm.value;
  //     this.api_s.postApi('register-add', formData).then((resp: any) => {
  //       if (resp && resp.status) {
  //         this.globle_s.showToastr('Success', resp?.message);
  //         this.globle_s.modalDismiss('userModal');
  //         this.cf.detectChanges();

  //       } else {
  //         this.globle_s.showToastr('Error', resp?.message);
  //       }
  //     });
  //     this.registrationForm.reset();
  //   }
  // }

  dismissModal(modalName: any) {
    // Logic to dismiss the modal (close it)
    this.globle_s.modalDismiss(modalName);
    this.registrationForm.reset();
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (this.passwordVisible) {
      passwordField.type = 'text';
    } else {
      passwordField.type = 'password';
    }
  }


  opnModal(modalName: string) {
    this.globle_s.modalOpen(modalName);
  }

  // Handle form submission
  onLoginSubmit(): void {
    if (this.loginForm.invalid) {
      return; // Stop if form is invalid
    }

    const formData = this.loginForm.value;
    this.api_s.postApi('login', formData).then((resp: any) => {
      if (resp && resp.status) {
        this.globle_s.showToastr('Success', resp?.message);
        this.globle_s.modalDismiss('userModal');
         localStorage.setItem('lamcartadmin', JSON.stringify(this.loginForm.value));
        
        this.router.navigate(['/lamcartAdmin/features/dashboard']);
        this.cf.detectChanges();
      } else {
        this.globle_s.showToastr('Error', resp?.message);
      }
    });
  }

}
