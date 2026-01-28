import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../../../core/services/api';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {

  all_data: any

  constructor(
    public api_s: Api,
    private cf: ChangeDetectorRef) {
    this.get_data();
  }
  ngOnInit() {
    this.api_s.updateMetaInfo(
      'About Us',
      'Lamcart is a Gujarat-based laminate company delivering high-quality decorative & interior laminates with custom designs and expert project support.',
      'about'
    )
  }


  get_data() {
    this.api_s.postApi('consonantal-get', '').then((resp: any) => {
      this.all_data = resp.data;
      this.cf.detectChanges();
    }, (err: any) => {
      // this.isLoading = false;
    });
  }

}
