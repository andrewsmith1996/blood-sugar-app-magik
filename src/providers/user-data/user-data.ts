import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserData {
	results:any[];

  constructor(public storage: Storage) {
	console.log('Hello UserDataProvider Provider');
  }

  	setResults(data){
		this.getResults().then(val => {
			if(typeof val == undefined || val == null){
				this.results = [];
			} else{
				this.results = val;
			}
			this.results.push(data);
			this.storage.set('results', this.results);
		});
		
		
	  }
	  

	getResults() {	
		return this.storage.get('results');
  	}

	clearData(){
		this.storage.clear();
	}

	getCarbNumber(){
		return this.storage.get('carbNumber')
	}

	setCarbNumber(number){
		this.storage.set('carbNumber', number);
  	}

}
