import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class Api {

  // apiURL = "https://lamcart.com/api/";
  // imageBaseUrl = "https://lamcart.com/image/";


  apiURL = 'http://192.168.1.37:8001/api/';
  imageBaseUrl = "http://192.168.1.37:8001/image/";

  constructor(
    public http: HttpClient,
    private meta: Meta,
    private title: Title
  ) { }

  postApi(key: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiURL + key, data).subscribe(result => {
        resolve(result);
      }, (err) => {
        reject(err);
      });
    });
  }

  getApi(key: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiURL + key, {}).subscribe(result => {
        resolve(result);
      }, (err) => {
        reject(err);
      });
    });
  }
  updateMetaInfo(title: any, content: any, routeaName: any) {
    this.title.setTitle(title);
    this.meta.updateTag({
      name: 'description',
      content: content
    });

    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = 'https://www.lamcart.com/' + routeaName;
    document.head.appendChild(link);
  }

}
