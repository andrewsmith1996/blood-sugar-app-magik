import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ResultsPage } from '../pages/results/results';
import { AboutPage } from '../pages/about/about';
import { CarbsPage } from '../pages/carbs/carbs';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration';
import { UserData } from '../providers/user-data/user-data';

@NgModule({
  declarations: [
    MyApp,
    ResultsPage,
    HomePage,
    TabsPage,
    AboutPage,
    CarbsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ResultsPage,
    HomePage,
    TabsPage,
    AboutPage,
    CarbsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Vibration,
    UserData
  ]
})
export class AppModule {}
