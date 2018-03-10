import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data/user-data';
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  carbCountValue:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData:UserData) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    this.userData.getCarbNumber().then(val => {
      this.carbCountValue = val;
    })
  }

  saveSettings(){
    this.userData.setCarbNumber(this.carbCountValue);
  }


}
