import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';

/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  event1 = { startTime: new Date().toISOString(), allDay: false };
  $items: any;
  loading: any;
  datee: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
    this.changeDate();
  }

  changeDate() {
    // console.log(this.event1.startTime)

    var formatedDate = new Date(this.event1.startTime);
    const date = moment(formatedDate).format("YYYY-MM-DD");
    this.datee = date
    // console.log(this.datee)

  }


  get_all_schedule_appointments() {
    console.log(this.datee);


    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.http.get("https://kalansarigroup.com/vendor/schedule_appointments.php/view_by_date/" + this.datee)
      .subscribe(data => {
        // console.log(JSON.parse(data["_body"]))
        this.$items = JSON.parse(data["_body"]);
        this.loading.dismiss();
      }, err => {
        console.log(err);
        this.loading.dismiss();
      });

  }

}
