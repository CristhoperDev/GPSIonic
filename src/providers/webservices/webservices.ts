import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the WebservicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebservicesProvider {
  path: string = 'http://192.168.1.7/gps/Controlador/GPSControl.php';
  url = "http://192.168.1.7/gps/Controlador";
  constructor(public http: HttpClient) {
    console.log('Hello WebservicesProvider Provider');
  }
  Grabar0(lugar) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/GPSControl.php', 'op=1&txtcod=&txtlugar='+lugar , {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  Grabar(lugar) {
    return new Promise(resolve => {
      this.http.get(this.path+'?op=1&txtlugar='+lugar)
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }

}
