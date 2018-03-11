import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { UserData } from '../../providers/user-data/user-data';
/**
 * Generated class for the AnalysisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html',
})
export class AnalysisPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  @ViewChild('barCanvas') barCanvas;
  barChart: any;

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  results:any[];
  lineData:any[];
  labels:any[];
 
  batch_one = 0;
  batch_two = 0;
  batch_three = 0;
  batch_four = 0;
  batch_five = 0;

  lineAxis:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserData) {


  }

	ionViewDidEnter() {

		this.userData.getResults().then(val => {
			if(val == null){
				this.results = [];
			} else{
				this.results = val;
				for(let result of this.results){
					var value = parseFloat(result.level);
					if(value > 0.0 && value <= 4.0){
						this.batch_one++;
					} else if(value > 4.0 && value <= 8.0){
						this.batch_two++;
					} else if(value > 8.0 && value <= 12.0){
						this.batch_three++;
					} else if(value > 12.0 && value <= 18.0){
						this.batch_four++;
					} else if(value > 18.0 && value <= 30.0){
						this.batch_five++;
					}
				}
			}

			this.createPieChart();
			this.createBarChart();
			this.createLineChart();

		});

 	}
	
	createPieChart(){
		this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
			type: 'doughnut',
			options: {legend: {labels: {fontSize:9}}},
			data: {
				labels: ["0.0 to 4.0", "4.0 to 8.0", "8.0 to 12.0", "12.0 to 18.0", "18.0 to 30.0"],
				datasets: [{
					data: [this.batch_one, this.batch_two, this.batch_three, this.batch_four, this.batch_five],
					backgroundColor: [
						'rgba(255, 99, 132, 0.6)',
						'rgba(54, 162, 235, 0.6)',
						'rgba(255, 206, 86, 0.6)',
						'rgba(75, 192, 192, 0.6)',
						'rgba(153, 102, 255, 0.6)',
						'rgba(255, 159, 64, 0.6)'
					],
					hoverBackgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56",
						"#FF6384",
						"#36A2EB",
						"#FFCE56"
					]
				}],
			}
		});
	}

	createBarChart(){
		this.barChart = new Chart(this.barCanvas.nativeElement, {
		   
			type: 'bar',
			data: {
			  
			  labels: ["0.0 to 4.0", "4.0 to 8.0", "8.0 to 12.0", "12.0 to 18.0", "18.0 to 30.0"],
				datasets: [{
					label: 'No. of results',
					data: [this.batch_one, this.batch_two, this.batch_three, this.batch_four, this.batch_five],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					responsive: false,
					borderColor: [
						'rgba(255,99,132,1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
					  
						ticks: {
							beginAtZero:true,
							suggestedMax: this.results.length,
							 categoryPercentage: 2.0,
							barPercentage: 2.0,
							stepSize: 2,
							fontSize: 10
							
						}
					}], xAxes:[{ ticks:{fontSize: 10}}]
				}
			}
 
		});
	}

		  
	createLineChart(){
		this.generateLineData();
		console.log(this.lineData);
		this.lineChart = new Chart(this.lineCanvas.nativeElement, {
			type: 'line',
			data: this.lineData,
			
			options: {
	
				scales: {
					xAxes: [{
						type: 'time',
						time: {
							unit: 'day',
							unitStepSize: 1,
							displayFormats: {
							   'day': 'MMM DD'
							}
						}
					}],
					
				}
			}
		});
	}

	generateLineData(){
		if(this.lineData == null){
			this.lineData = [];
		}

		if(this.labels == null){
			this.labels = [];
		}

		for(let result of this.results){
			var dateTime = new Date(result.time);

			// var hours = (dateTime.getHours()<10?'0':'') + dateTime.getHours();
			// var minutes = (dateTime.getMinutes()<10?'0':'') + dateTime.getMinutes();
			
			// var testTime = hours + ':' + minutes;
			

			var newPoint = {
				y:parseInt(result.level),
				x:new Date()
			};

			
			this.lineData.push(newPoint);
		}
	}

}
