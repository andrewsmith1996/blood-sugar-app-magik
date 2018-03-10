import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { UserData } from '../../providers/user-data/user-data';

@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})
export class ResultsPage {
	results: any[];
  	level: any;
  	date:any;
	totalResults:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public userData:UserData) {
	  
  }

  ionViewDidLoad(){
	this.userData.getResults().then(val => {
		this.results = val;
		this.totalResults = this.results.length;
	});
  }

  ionViewWillEnter(){
	this.userData.getResults().then(val => {
		this.results = val;
		this.totalResults = this.results.length;
	});
	
  }

  deleteStorage(){
		this.userData.clearData();
		this.results = [];
  }

  delete(item){
	let index = this.results.indexOf(item);
	if(index > -1){
	   this.storage.get('results').then((val) => {
		if(val != null && val.length > 0){
		  this.results = val;
		  this.results.splice(index, 1); 
		  this.storage.set('results', this.results);
		}
		});
	   
	 
	}
  }

}
