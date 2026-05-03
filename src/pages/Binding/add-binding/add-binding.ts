import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Events, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the AddBindingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-binding',
  templateUrl: 'add-binding.html',
})
export class AddBindingPage {
  $services: any;
  filter_service_arr: any;
  mm: boolean = true;
  service_name: string;


  $doctors: any;
  filter_doctor_arr: any;
  mm2: boolean = true;
  doctor_name: string;
  arr_save: any = {};
  loading: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    public toast: ToastController, public events: Events, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBindingPage');
    this.get_all_service();
    this.get_all_doctor();
  }
  filter_service(ev: any) {
    this.mm = true;

    const filterItems = (arr, query) => {
      // return arr.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
      return arr.filter(el => el.name.indexOf(query) !== -1)
    }

    this.filter_service_arr = filterItems(this.$services, this.service_name);
  }

  filter_doctor(ev: any) {
    this.mm2 = true;

    const filterItems = (arr, query) => {
      // return arr.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
      return arr.filter(el => el.name.indexOf(query) !== -1)
    }

    this.filter_doctor_arr = filterItems(this.$doctors, this.doctor_name);
  }


  select_service(item: any) {
    this.mm = false;
    this.service_name = item.name;
    console.log(this.service_name)
  }

  select_doctor(item: any) {
    this.mm2 = false;
    this.doctor_name = item.name;
    console.log(this.doctor_name)
  }

  get_all_service() {
    this.http.get("https://kalansarigroup.com/vendor/binding_doctor.php/all_service")
      .subscribe(data => {
        console.log(JSON.parse(data["_body"]))
        this.$services = JSON.parse(data["_body"]);
      }, err => {
        console.log(err);
      });

  }


  get_all_doctor() {
    this.http.get("https://kalansarigroup.com/vendor/binding_doctor.php/all_doctor")
      .subscribe(data => {
        console.log(JSON.parse(data["_body"]))
        this.$doctors = JSON.parse(data["_body"]);
      }, err => {
        console.log(err);
      });

  }

  add_binding() {
    if (this.service_name == '' || this.service_name == null || this.service_name == undefined) {
      this.showToast('يرجى اختيار الخدمة');
      return false;
    }

    if (this.doctor_name == '' || this.doctor_name == null || this.doctor_name == undefined) {
      this.showToast('يرجى اختيار الدكتور');
      return false;
    }

    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.arr_save.doctor = this.doctor_name;
    this.arr_save.services = this.service_name;
    console.log(this.arr_save);

    this.http.post("https://kalansarigroup.com/vendor/binding_doctor.php/insert", this.arr_save).subscribe(data => {
      console.log(data);
      let result = JSON.parse(data["_body"]);
      console.log(result);

      if (result.status == "success") {
        this.showToast("تم الحفظ بنجاح");
        this.doctor_name = "";
        this.service_name = "";
        this.loading.dismiss();
      }
      else {
        this.showToast("يوجد خطأ لم يتم حفظ العملية");
        this.loading.dismiss();
      }

    }, err => {
      console.log(err);
      this.showToast("يوجد خطأ لم يتم حفظ العملية");
      this.loading.dismiss();
    })
  }

  showToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  ionViewWillLeave() {
    console.log("66666666666");
    this.events.publish('user:created');
  }

}
