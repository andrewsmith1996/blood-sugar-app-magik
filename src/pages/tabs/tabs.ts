import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ResultsPage } from '../results/results';
import { AboutPage } from '../about/about';
import { CarbsPage } from '../carbs/carbs';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ResultsPage;
  tab3Root = CarbsPage;
  tab4Root = AboutPage;

  constructor() {

  }
}
