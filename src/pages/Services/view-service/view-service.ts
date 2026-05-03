import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController, Events, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-service',
  templateUrl: 'view-service.html',
})
export class ViewServicePage {
  tablestyle = 'bootstrap';
  $items: any;
  loading: any;
  defaultImage: string = "assets/img/logo.png";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    public events: Events, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
      events.subscribe('user:created', () => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        console.log('Welcome Back Page');
        this.get_all_services();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewServicePage');
    this.get_all_services();

  }
  get_all_services() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.http.get("https://kalansarigroup.com/vendor/all_services.php/all_services")
      .subscribe(data => {
        console.log(JSON.parse(data["_body"]))
        this.$items = JSON.parse(data["_body"]);
        this.loading.dismiss();
      }, err => {
        console.log(err);
        this.loading.dismiss();
      });
  }
  add_service() {
    this.navCtrl.push("AddServicePage");
  }

  edit_item(par: any) {
    this.navCtrl.push("EditServicePage", { par: par });
    console.log(par);
    // var modalPage = this.modalCtrl.create('EditDoctorPage' , {par: par}); 
    // modalPage.present();
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
            this.http.delete("https://kalansarigroup.com/vendor/all_services.php/delete/" + par.id)
              .subscribe(data => {
                console.log(JSON.parse(data["_body"]))
                // this.$items = JSON.parse(data["_body"]);
                // this.loading.dismiss();
                this.get_all_services();
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
