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
  lat: number = 1.678418;
  lng: number = 7.809007;

  constructor(public navCtrl: NavController,
              private geolocation: Geolocation,
              private httpClient: HttpClient,
              private toastCtrl: ToastController) {

  }

  ionViewDidEnter(){
    this.geolocation.watchPosition().subscribe((position: Geoposition) => {
      let coords = position.coords;

      if(coords){

        this.lat = coords.latitude;
        this.lng = coords.longitude;

        const geolocalization: Geolocalization = {
          latitude: this.lat,
          longitude: this.lng
        };

        this.toastCtrl.create({
          message: 'Nueva posicion' + JSON.stringify(geolocalization),
          duration: 1000
        }).present();

        this.httpClient.post('http://192.168.43.202:8080/nodes', geolocalization).subscribe(data => {
          let message = "Nodo insertado" + JSON.stringify(data);
          this.toastCtrl.create({
            message: message,
            duration: 2000
          }).present();

          console.log(message);
        });
      }
    });
  }
}
