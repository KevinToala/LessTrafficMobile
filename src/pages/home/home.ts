import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import {HttpClient} from "@angular/common/http";
import {Geolocalization} from "../../app/geolocalization";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(public navCtrl: NavController,
              private geolocation: Geolocation,
              private httpClient: HttpClient,
              private toastCtrl: ToastController) {
    geolocation.watchPosition().subscribe((position: Geoposition) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

      const geolocalization: Geolocalization = {
        latitude: this.lat,
        longitude: this.lng
      };

      this.httpClient.post('nodes', geolocalization).subscribe(data => {
        this.toastCtrl.create({
          message: "Nodo insertado" + JSON.stringify(data),
          duration: 1000
        })
      });
    });
  }

}
