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

  low:any = { lower: 0, upper: 4 };
  good:any = { lower: 4, upper: 12 };
  high:any = { lower: 12, upper: 40 };

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData:UserData) {
  }

  ionViewDidLoad() {
	this.userData.getCarbNumber().then(val => {
		this.carbCountValue = val;
	});


	this.userData.getLowBounds().then(val =>{
		if(val != null){
			this.low = val;
		}
	});

	this.userData.getGoodBounds().then(val =>{
		if(val != null){
			this.good = val;
		}
	});

	this.userData.getHighBounds().then(val =>{
		if(val != null){
			this.high = val;
		}
	});

  }

  saveSettings(){
	this.userData.setCarbNumber(this.carbCountValue);
	this.userData.setLowBounds(this.low);
	this.userData.setGoodBounds(this.good);
	this.userData.setHighBounds(this.high);
  }


}
