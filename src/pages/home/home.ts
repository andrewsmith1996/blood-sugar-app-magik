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
	}

	ionViewDidEnter(){
		this.userData.getResults().then(val => {
			if(val == null){
				this.results = [];
			} else{
				this.results = val;
				this.prev = parseFloat(this.results[this.results.length - 1].level).toFixed(1);
				this.calculateValues();
				this.calculateAverage();
			}
			
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
	  	this.date = ("0" + current.getHours()).slice(-2) + ":"  + ("0" + current.getMinutes()).slice(-2) + " " + ("0" + current.getDate()).slice(-2) + "/" + ("0" + (current.getMonth() + 1)).slice(-2)  + "/"  + current.getFullYear();
	  
		var newResult = {
			'level' : parseFloat(this.level).toFixed(1),
			'time': this.date, 
			'units': this.units
		};

		this.userData.getResults().then(val => {
			if(val == null){
				this.results = [];
			} else{
				this.results = val;
			}
			
			this.results.push(newResult);
			
			this.userData.setResults(this.results);

			

				if(this.results.length != 0){
					if((parseFloat(this.level).toFixed(1) < this.prev) && this.prev > 9 || (parseFloat(this.level).toFixed(1) > this.prev) && this.prev < 4){
						this.showComparison(1);
					} else{
						this.showComparison(2);
					}
				}

				this.resetFields();
				this.calculateValues();
				this.calculateAverage();
		});
	
	} 
	
  }

  	showComparison(flag){

		this.vibration.vibrate(1000);

		var message = '';
		var className = '';

		if(flag == 1){
			message = 'You have improved since your last result!';
			className = 'upToast';
		} else{
			message = "You haven't improved your blood sugar since your last result!";
			className = 'downToast';
		}

		let toast = this.toastCtrl.create({
			message:message,
			duration: 1500,
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

	calculateAverage(){
		var total = 0.0
		var levels = [];
		
		for (let result of this.results) {
			total += parseFloat(result.level);
			levels.push(parseFloat(result.level).toFixed(1));
		}


		
		this.average = (total / this.results.length).toFixed(1);
	}

	calculateValues(){
		var levels = [];

		for (let result of this.results) {
			levels.push(parseFloat(result.level).toFixed(1));
		}

		this.latestResult = parseFloat(this.results[this.results.length - 1].level).toFixed(1);
		this.latestTime = this.results[this.results.length - 1].time;

		this.max = Math.max.apply(null, levels);
		this.min = Math.min.apply(null, levels);
	}

	
}
