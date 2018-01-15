import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {Geolocation, Geoposition} from "@ionic-native/geolocation";
import {NativeGeocoder, NativeGeocoderReverseResult} from "@ionic-native/native-geocoder";
import {LocationAccuracy} from "@ionic-native/location-accuracy";
import {WebservicesProvider} from "../../providers/webservices/webservices";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lugar:any;
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public webservice: WebservicesProvider,public geocoder: NativeGeocoder, public toaster: ToastController, public locac: LocationAccuracy) {
  }

  geoLocation() {
    let options = {
      enableHighAccuracy: true
    };
    this.locac.canRequest().then((res: boolean) => {
      if (res) {
        this.locac.request(this.locac.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
          this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
            this.getLocation(position);

          }).catch((err) => {
            alert(err);
          })
        }, (error) => {
          alert(error);
        })
      }
    });
  }

    getLocation(pos) {
      this.geocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude).then((res: NativeGeocoderReverseResult) => {
        let country = this.toaster.create({
          message: res.thoroughfare + " " + res.subThoroughfare + " - " + res.locality,
          duration: 4000
        });
        country.present();
        this.webservice.Grabar(res.thoroughfare + " " + res.subThoroughfare + " - " + res.locality).then((result) => {
          console.log(result);
          this.lugar = result;
        }, (err) => {
          console.log(err);
        });
      });

  }



}
