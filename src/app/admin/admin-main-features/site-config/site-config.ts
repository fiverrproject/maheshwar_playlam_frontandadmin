import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../../../core/services/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globle } from '../../../core/services/globle';

@Component({
  selector: 'app-site-config',
  standalone: false,
  templateUrl: './site-config.html',
  styleUrl: './site-config.scss',
})
export class SiteConfig {
  show: any = false;
  site_config: any[] = [];
  site_config_ID: any = false;


  site_configForm!: FormGroup;
  constructor(
    public api_s: Api,
    public globle_s: Globle,
    private fb: FormBuilder,
    private cf: ChangeDetectorRef
  ) {
    this.get_data();
  }
  ngOnInit(): void {
    this.site_configForm = this.fb.group({
      id: '',
      mobile_1: ['', Validators.required],
      mobile_2: [''],
      social_1: [''],
      social_2: [''],
      social_3: [''],
      social_4: [''],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      map_url: ['']
    });
  }


is_loader:boolean =false;
  get_data() {
     this.is_loader = true;
    this.api_s.postApi('site-config-get', '').then((resp: any) => {
      this.site_config = resp.data;
      console.log("1111", this.site_config);
     
   
          this.is_loader = false;
     
      this.cf.detectChanges()
    }, (err: any) => {
       this.is_loader = false;
    });
  }

  update(item: any) {
    this.globle_s.modalOpen('site_configModal');
    console.log("::", item);
    this.site_config_ID = true;
    this.site_configForm.patchValue({
      id: item.id,
      mobile_1: item.mobile_1,
      mobile_2: item.mobile_2,
      social_1: item.social_1,
      social_2: item.social_2,
      social_3: item.social_3,
      social_4: item.social_4,
      email: item.email,
      address: item.address,
      map_url: item.map_url
    });
  }
  opnModal(modalName: string) {
    this.globle_s.modalOpen(modalName);
  }

  dismissModal(modalName: string) {
    this.globle_s.modalDismiss(modalName);
    this.site_config_ID = null;
  }

  onSubmit() {
    if (this.site_configForm.invalid) {
      this.site_configForm.markAllAsTouched();
      return;
    }

    if (this.site_config_ID != true) {

      this.api_s.postApi('site-config-add', this.site_configForm.value).then((resp: any) => {
        console.log('FORM DATA confirm', this.site_configForm.value);

        this.site_config.unshift(resp.data);

        this.dismissModal('site_configModal');
        this.site_configForm.reset();
        this.site_config_ID = null;

        // this.globle_s.showToastr('Success', 'Form SuccessFully Site Config');
      }, (err: any) => {
        // this.globle_s.showToastr('Error', 'Not Form Submit');
      });
    } else {
      this.api_s.postApi('site-config-edit', this.site_configForm.value).then((resp: any) => {
        console.log('Edit FORM DATA confirm', this.site_configForm.value);


        const index = this.site_config.findIndex(
          x => x.id === this.site_configForm.value.id
        );

        if (index !== -1) {
          this.site_config[index] = resp.data;
        }

        this.dismissModal('site_configModal');
        this.site_configForm.reset();
        this.site_config_ID = null;
        // this.globle_s.showToastr('Success', 'Form SuccessFully Site Config');
      }, (err: any) => {
        // this.globle_s.showToastr('Error', 'Not Form Submit');
      });
    }


    // API call here



    // 
  }



}