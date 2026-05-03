import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Events, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  items: any = {};
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    public toast: ToastController, public events: Events, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  add_settings(){

    // this.loading = this.loadingCtrl.create();
    // this.loading.present();

    console.log(this.items);


    this.http.post("https://kalansarigroup.com/vendor/all_settings.php/all_settings", this.items).subscribe(data => {
      console.log(data);
      let result = JSON.parse(data["_body"]);
      console.log(result);

      if (result.status == "success") {
        this.showToast("تم الحفظ بنجاح");
        // this.loading.dismiss();
      }
      else {
        this.showToast("يوجد خطأ لم يتم حفظ العملية");
        // this.loading.dismiss();
      }

    }, err => {
      console.log(err);
      this.showToast("يوجد خطأ لم يتم حفظ العملية");
      // this.loading.dismiss();
    })
  }

  showToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
