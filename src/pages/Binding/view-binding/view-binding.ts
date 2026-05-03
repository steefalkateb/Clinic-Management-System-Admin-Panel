import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController, Events, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewBindingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-binding',
  templateUrl: 'view-binding.html',
})
export class ViewBindingPage {

  tablestyle = 'bootstrap';
  $items: any;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    public events: Events, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    events.subscribe('user:created', () => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome Back Page');
      this.get_all_binding();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewBindingPage');
    this.get_all_binding();
  }

  get_all_binding() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.http.get("https://kalansarigroup.com/vendor/binding_doctor.php/all_binding")
      .subscribe(data => {
        console.log(JSON.parse(data["_body"]))
        this.$items = JSON.parse(data["_body"]);
        this.loading.dismiss();
      }, err => {
        console.log(err);
        this.loading.dismiss();
      });

  }
  add_binding() {
    this.navCtrl.push("AddBindingPage");
  }


  delete_item(par: any) {
    let alert = this.alertCtrl.create({
      title: 'حذف',
      message:
        `<p>هل أنت متأكد من الحذف ؟</p>
      <p>Are you sure you want to delete?</p>`
      ,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'delete',
          handler: () => {
            console.log(par);
            // this.WashService.Delete_Group(wash.key);
            this.http.delete("https://kalansarigroup.com/vendor/binding_doctor.php/delete/" + par.id)
              .subscribe(data => {
                console.log(JSON.parse(data["_body"]))
                // this.$items = JSON.parse(data["_body"]);
                // this.loading.dismiss();
                this.get_all_binding();
              }, err => {
                console.log(err);
                // this.loading.dismiss();
              });
            //
          }
        }
      ]
    });
    alert.present();
  }

}
