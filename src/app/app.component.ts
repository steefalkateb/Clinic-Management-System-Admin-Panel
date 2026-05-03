import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // @ViewChild(Nav) nav: Nav;

  // rootPage: any = HomePage;
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'SchedulePage';
  // pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'List', component: ListPage }
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }

  OpenPage_Schedule() {
    this.nav.setRoot('SchedulePage');
    console.log("SchedulePage");
   
  }

  OpenPage_View_Doctor(){
    this.nav.setRoot('ViewDoctorPage');
    console.log("ViewDoctorPage");
  }
  
  OpenPage_View_Services(){
    this.nav.setRoot('ViewServicePage');
    console.log("ViewServicePage");  
  }

  OpenPage_View_Binding(){
    this.nav.setRoot('ViewBindingPage');
    console.log("ViewBindingPage"); 
  }

  OpenPage_Offer_Page(){
    this.nav.setRoot('ViewOfferPage');
    console.log("ViewOfferPage");
  }
  OpenPage_ViewNotificationPage(){
    this.nav.setRoot('ViewNotificationPage');
    console.log("ViewNotificationPage");
  }
  OpenPage_SettingsPage(){
    this.nav.setRoot('SettingsPage');
    console.log("SettingsPage");
  }
}
