import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController, Events, IonicPage, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewOfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-offer',
  templateUrl: 'view-offer.html',
})
export class ViewOfferPage {
  // tablestyle = 'bootstrap';
  $items: any;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    public events: Events, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController) {

    events.subscribe('user:created', () => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome Back Page');
      this.get_all_offers();
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewOfferPage');
    this.get_all_offers();

  }
  get_all_offers() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.http.get("https://kalansarigroup.com/vendor/all_offers.php/all_offers")
      .subscribe(data => {
        console.log(JSON.parse(data["_body"]))
        this.$items = JSON.parse(data["_body"]);
        this.loading.dismiss();
      }, err => {
        console.log(err);
        this.loading.dismiss();
      });
  }
  delete_item(par: any) {
    console.log(par);
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
            this.http.delete("https://kalansarigroup.com/vendor/all_offers.php/delete/" + par.id)
              .subscribe(data => {
                console.log(JSON.parse(data["_body"]))
                // this.$items = JSON.parse(data["_body"]);
                // this.loading.dismiss();
                this.get_all_offers();
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


  add_offer() {
    this.navCtrl.push("AddOfferPage");
  }

}
