import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Events, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the AddServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-service',
  templateUrl: 'add-service.html',
})
export class AddServicePage {
  // $services: any;
  // filter_service_arr: any;
  // mm: boolean = true;
  // service_name: string;
  items: any = {};

  path_image: string = "assets/imgs/logo_ionic.png";
  file: File;

  // $doctors: any;
  // filter_doctor_arr: any;
  // mm2: boolean = true;
  // doctor_name: string;
  // arr_save: any = {};
  loading: any;

  image_base64: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    public toast: ToastController, public events: Events, public loadingCtrl: LoadingController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddServicePage');

  }
  fileChange(event: any) {
    // try {
    this.path_image = "assets/imgs/logo.png"
    this.file = event.target.files[0];

    var aa: any;
    console.log(this.file.type)
    aa = this.file.size / 1024 / 1024
    if (aa > 1) {
      this.showToast('Image size must be less than 1 MB \n  يجب أن يكون حجم الصورة أقل من 1 ميجا بايت');
      event.target.value = ''
    }
    else {
      // console.log('qqq')

      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();

        reader.onload = (event: any) => {
          //////////////////////////////////////////
          //////////////////////////////////////////
          this.path_image = event.target.result;
          // console.log(event.target);
          // console.log(this.image_base64);



          if (this.file.type == "image/jpeg") {
            this.image_base64 = this.path_image

            // console.log(this.image_base64)
            this.image_base64 = this.image_base64.replace("data:image/jpeg;base64,", "");
            console.log("jpg");
            // console.log(this.image_base64)
          }
          else if (this.file.type == "image/png") {
            this.image_base64 = this.path_image
            this.image_base64 = this.image_base64.replace("data:image/png;base64,", "");
            console.log("png");
          }



        }
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }





  add_service() {
    // if (this.items.name == '' || this.items.name == null || this.items.name == undefined) {
    //   this.showToast('يرجى اسم الخدمة');
    //   return false;
    // }
    // if (this.items.desc1 == '' || this.items.desc1 == null || this.items.desc1 == undefined) {
    //   this.showToast('يرجى الوصف 1 ');
    //   return false;
    // }
    // if (this.items.desc2 == '' || this.items.desc2 == null || this.items.desc2 == undefined) {
    //   this.showToast('يرجى الوصف 2 ');
    //   return false;
    // }
    // if (this.items.price == '' || this.items.price == null || this.items.price == undefined) {
    //   this.showToast('يرجى السعر ');
    //   return false;
    // }
    // if (this.items.time == '' || this.items.time == null || this.items.time == undefined) {
    //   this.showToast('يرجى الوقت ');
    //   return false;
    // }
    // if (this.items.type == '' || this.items.type == null || this.items.type == undefined) {
    //   this.showToast('يرجى  اختيار نوع الخدمة');
    //   return false;
    // }
    // if (this.items.image == '' || this.items.image == null || this.items.image == undefined) {
    //   this.showToast('يرجى اختيار الصورة ');
    //   this.items.image = "https://kalansarigroup.com/ALWADI_2021/doctors/logo_pro.png";
    //   console.log(this.items.image);
    //   return false;
    // }


    this.loading = this.loadingCtrl.create();
    this.loading.present();

    console.log(this.items);
    this.items.image = this.image_base64;
    this.items.image_name = (Math.floor(100000 + Math.random() * 900000)) + this.file.name;
    this.items.path_image = "https://kalansarigroup.com/vendor/services/" + this.items.image_name;

    this.http.post("https://kalansarigroup.com/vendor/all_services.php/insert", this.items).subscribe(data => {
      console.log(data);
      let result = JSON.parse(data["_body"]);
      console.log(result);

      if (result.status == "success") {
        this.showToast("تم الحفظ بنجاح");
        this.items.name = "";
        this.path_image = "assets/imgs/logo_ionic.png";
        this.items.desc1 = "";
        this.items.type = "";
        this.items.desc2 = "";
        this.items.price = "";
        this.items.time = "";

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
