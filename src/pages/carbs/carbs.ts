import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { UserData } from '../../providers/user-data/user-data';
/**
 * Generated class for the CarbsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-carbs',
  templateUrl: 'carbs.html',
})
export class CarbsPage {

  carbs:any;
  calculatedCarbs:any;
  buttonClicked:boolean;
  carbNumber:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public userData: UserData) {
  }

  ionViewDidLoad() {
    this.buttonClicked = false;
    console.log('ionViewDidLoad CarbsPage');
  }

  calculateCarbs(){
    this.buttonClicked = true;
    this.userData.getCarbNumber().then(val => {
      this.carbNumber = val;
      this.calculatedCarbs = this.carbs / this.carbNumber;
    })

   
  }


}
