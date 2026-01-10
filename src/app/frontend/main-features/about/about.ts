import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../../../core/services/api';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {

  all_data: any

  constructor(public api_s: Api,
    private cf: ChangeDetectorRef) {
    this.get_data();
  }

  get_data(){
      this.api_s.postApi('consonantal-get', '').then((resp: any) => {
      this.all_data = resp.data;
      this.cf.detectChanges();
      console.log(":::::", this.all_data);
    }, (err: any) => {
      // this.isLoading = false;
    });
  }

}
