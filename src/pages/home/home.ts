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
  prev:any;

  average:any;

  low:any = {};
  good:any = {};
  high:any = {};
 
  constructor(public navCtrl: NavController, private vibration: Vibration, public toastCtrl: ToastController, public userData: UserData){
	this.level = "";
  }

  ionViewDidLoad(){
	

	let toast = this.toastCtrl.create({
		message: 'Welcome back, Andrew!',
		duration: 3000,
		position: 'top'
	});

	toast.present();

	this.userData.getResults().then(val => {
		this.results = val;
		this.prev = this.results[this.results.length - 1];
		
		var total = 0.0;
		var levels = [];

		for (let result of this.results) {
			total += parseFloat(result.level);
			levels.push(parseFloat(result.level));
		}

		this.latestResult = this.results[this.results.length - 1].level;
		this.latestTime = this.results[this.results.length - 1].time;

		this.average = (total / this.results.length).toFixed(1);

		this.max = Math.max.apply(null, levels);
		this.min = Math.min.apply(null, levels);

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

  ionViewWillEnter(){




	this.userData.getResults().then(val => {
		this.results = val;
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

  saveItem(){
  
	  var valid = true;

	if(typeof(this.level) == undefined || this.level == ''){
		valid = false;
		this.showInvalidToast();
	}

	if(valid == true){

		var current = new Date(); 
	  	this.date = current.getHours() + ":"  + current.getMinutes() + " " + current.getDate() + "/" + (current.getMonth()+1)  + "/"  + current.getFullYear();
	  
		var newResult = {
			'level' : this.level,
			'time': this.date, 
			'units': this.units
		};

		if(this.level < this.prev){
			this.showComparison(true);
		} else{
			this.showComparison(false);
		}
	
		this.userData.setResults(newResult);
	  
	  	this.resetFields();
		
	} 
	
  }

  	showComparison(flag){
		var message = '';
		var className = '';

		if(flag == true){
			message = 'Your blood sugar was less than your previous result!';
			className = 'downToast';
		} else {
			message = 'Your blood sugar was higher than your previous result.';
			className = 'upToast';
		}

		let toast = this.toastCtrl.create({
			message:message,
			duration: 3000,
			position: 'middle',
			cssClass: className,
		});
		toast.present();
	  }


	showInvalidToast(){
		let toast = this.toastCtrl.create({
			message: 'Invalid data!',
			duration: 5000,
			position: 'top'
		});
		toast.present();
		
	}

	resetFields(){
		this.level = '';
	  	this.units = '';
	}

	
}
