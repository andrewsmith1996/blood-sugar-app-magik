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
		var oldResults = [];
		oldResults.push(this.getResults());
		oldResults.push(data);
		this.storage.set('results', oldResults);
  	}

	getResults() {
		var returnedResults = [];
		this.storage.get('results').then((val) => {
			returnedResults.push(val);
		});

		console.log(returnedResults);
		return returnedResults;
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
