import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    geolocation.watchPosition().subscribe((position: Geoposition) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });
  }

}
