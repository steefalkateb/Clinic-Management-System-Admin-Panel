import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Events, IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddNotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-notification',
  templateUrl: 'add-notification.html',
})
export class AddNotificationPage {
  items: any = {};
  file: File;
  path_image: string = "assets/imgs/logo_ionic.png";
  loading: any;
  image_base64: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
     public http: Http, public toast: ToastController, public loadingCtrl: LoadingController, public events: Events) { }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotificationPage');
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

  add_notifications(){
    if (this.items.desc1 == '' || this.items.desc1 == null || this.items.desc1 == undefined) {
      this.showToast('يرجى ادخال الوصف 1 ');
      return false;
    }

    if (this.items.desc2 == '' || this.items.desc2 == null || this.items.desc2 == undefined) {
      this.showToast('يرجى ادخال الوصف 2 ');
      return false;
    }

    if (this.items.image == '' || this.items.image == null || this.items.image == undefined) {
      this.showToast('يرجى اختيار الصورة ');
      this.items.image = "https://kalansarigroup.com/ALWADI_2021/doctors/logo_pro.png";
      console.log(this.items.image);
      return false;
    }


          this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.items.image = this.image_base64;

    this.items.image_name = (Math.floor(100000 + Math.random() * 900000)) + this.file.name;
    this.items.path_image = "https://kalansarigroup.com/vendor/notifications/" + this.items.image_name;


    console.log(this.items.path_image);

    this.http.post("https://kalansarigroup.com/vendor/all_notifications.php/insert", this.items).subscribe(data => {
      console.log(data);
      let result = JSON.parse(data["_body"]);
      console.log(result);

      if (result.status == "success") {
        this.showToast("تم الحفظ بنجاح");
        // this.items.name = "";
        // this.path_image = "assets/imgs/logo_ionic.png";
        // this.items.desc1 = "";
     

        this.loading.dismiss();
        this.closeModal();

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
    // }



    }
  
  closeModal() {
    this.viewCtrl.dismiss();
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
