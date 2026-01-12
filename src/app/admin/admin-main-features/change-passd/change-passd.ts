import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api } from '../../../core/services/api';
import { Router } from '@angular/router';
import { Globle } from '../../../core/services/globle';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-change-passd',
  standalone: false,
  templateUrl: './change-passd.html',
  styleUrl: './change-passd.scss',
})
export class ChangePassd {

   changePasswordForm!: FormGroup;

  // Static username
  username: any;

  constructor(public api_s: Api,
     public router: Router,
    private cf: ChangeDetectorRef,
    public globle_s: Globle,
    private fb: FormBuilder,) {}

  ngOnInit(): void {
      const user:any = localStorage.getItem('lamcartadmin');
    console.log("USername",JSON.parse(user).username)
  
      this.username = JSON.parse(user).username; 
    this.changePasswordForm = this.fb.group({
      username: [ this.username],  // Username is static
      old_password: ['', [Validators.required, ]],
      new_password: ['', [Validators.required ]]
    });
  }

  

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const formData = this.changePasswordForm.value;
      console.log('Password change requested:', formData);

        this.api_s.postApi('change-password', formData).then((resp: any) => {
      if (resp && resp.status) {
        this.globle_s.showToastr('Success', resp?.message); 
        
        this.router.navigate(['/lamcartAdmin/features/dashboard']);
        this.cf.detectChanges();
      } else {
        this.globle_s.showToastr('Error', resp?.message);
      }
    });
     
    }
  }

}
