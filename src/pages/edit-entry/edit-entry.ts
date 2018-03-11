import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserData } from '../../providers/user-data/user-data';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the EditEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-entry',
  templateUrl: 'edit-entry.html',
})
export class EditEntryPage {
  entry:any[];

  low:any = {};
  good:any = {};
  high:any = {};
	date:any;
  level:any;
  units:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl:ViewController, public userData:UserData) {
	this.entry = this.navParams.get('item');
	this.level = this.entry['level'];
	this.units = this.entry['units'];
  }

  ionViewDidLoad() {

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

  dismiss() {
	this.viewCtrl.dismiss();
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
  
	
	  
	  this.userData.setResults(newResult);
	  
		this.resetFields();
	  
	} 
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
