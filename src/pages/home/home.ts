import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ResultsPage } from '../results/results';
import { UserData } from '../../providers/user-data/user-data';

import { ToastController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  submittedLevel: any;
  results: any[];
  level: any;
  date: any;
  units:any;
  max: any;
  min: any;
  latestResult: any;
  latestTime: any;
  maxTime: any;
  minTime: any;
  average:any;
 
  constructor(public navCtrl: NavController, private vibration: Vibration, public toastCtrl: ToastController, public userData: UserData){
	this.level = "";
   
	  let toast = this.toastCtrl.create({
		message: 'Welcome back, Andrew!',
		duration: 5000,
		position: 'top'
	  });
	  toast.present();

	
  }

  saveItem(){
  
	  var valid = true;

	if(typeof(this.level) == undefined || this.level == ''){
		  valid = false;
	  let toast = this.toastCtrl.create({
		message: 'Invalid data!',
		duration: 5000,
		position: 'top'
		});
		toast.present();
	
		}

	if(valid == true){


	  var current = new Date(); 
	  this.date = current.getHours() + ":"  + current.getMinutes() + " " + current.getDate() + "/" + (current.getMonth()+1)  + "/"  + current.getFullYear();
	  var newResult = {'level' : this.level,'time': this.date, 'units': this.units};
	  this.userData.setResults(newResult);
		
	} 
	
  }

  ionViewWillEnter(){


		if(this.results != null && this.results.length > 0 ){
	  
			var total = 0.0;
			var levels = [];

			for (let result of this.results) {
				total += parseFloat(result.level);
				levels.push(result.level);
			}

			this.latestResult = this.results[this.results.length - 1].level;
			this.latestTime = this.results[this.results.length - 1].time;

			this.average = (total / this.results.length).toFixed(1);

			this.max = Math.max.apply(null, levels);
			this.min = Math.min.apply(null, levels);
		}


	}
	
}
