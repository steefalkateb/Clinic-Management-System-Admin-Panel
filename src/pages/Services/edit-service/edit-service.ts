import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Events, IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit-service',
  templateUrl: 'edit-service.html',
})
export class EditServicePage {
  file: File;
  image_base64: string = "";
  loading: any;

  item_edit: any;
  items: any = {
    id: null,
    name: null,
    desc1: null,
    desc2: null,
    specialty: null,
    path_image: "assets/imgs/logo_ionic.png",
    price: null,
    time: null,
    type: null
  }
  path_image: string = "assets/imgs/logo_ionic.png";

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public http: Http, public toast: ToastController, public events: Events, public loadingCtrl: LoadingController) {
    navParams.get('par');
    // console.log(navParams.get('par'));
    this.fill_array_service();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditServicePage');
  }
  fill_array_service() {
    this.item_edit = this.navParams.get('par');
    this.items.id = this.item_edit.id;
    this.items.name = this.item_edit.name;
    this.items.desc1 = this.item_edit.desc1;
    this.items.desc2 = this.item_edit.desc2;
    this.items.specialty = this.item_edit.specialty;
    this.items.price = this.item_edit.price;
    this.items.time = this.item_edit.time;
    this.items.type = this.item_edit.type;
    this.items.path_image = this.item_edit.image;
    this.path_image = this.item_edit.image;
    // console.log(this.path_image);
  }
  edit_service() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    // console.log(this.path_image);
    if (this.item_edit.image == this.path_image) {
      console.log('aaaaaaaaaaaaaaaaaaa');
      this.http.post("https://kalansarigroup.com/vendor/all_services.php/update", this.items).subscribe(data => {
        console.log(data);
        let result = JSON.parse(data["_body"]);
        console.log(result);

        if (result.status == "success") {

          this.showToast("تم الحفظ بنجاح");
          // this.items.name = "";
          // this.path_image = "assets/imgs/logo_ionic.png";
          // this.items.desc1 = "";
          // this.items.specialty = "";
          // this.items.desc2 = "";

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
    } else {
      console.log('aaaaaaaaaaaaaaaaaaa2222222222222222222222222');


      this.items.image = this.image_base64;
      this.items.image_name = (Math.floor(100000 + Math.random() * 900000)) + this.file.name;
      this.items.path_image = "https://kalansarigroup.com/vendor/services/" + this.items.image_name;

      this.http.post("https://kalansarigroup.com/vendor/all_services.php/update_img", this.items).subscribe(data => {
        console.log(data);
        let result = JSON.parse(data["_body"]);
        console.log(result);

        if (result.status == "success") {
          this.showToast("تم الحفظ بنجاح");
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

    }

  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
  fileChange(event: any) {
    // try {
    this.path_image = "assets/imgs/logo.png"
    this.file = event.target.files[0];

    var aa: any;
    // console.log(this.file.name)
    aa = this.file.size / 1024 / 1024
    if (aa > 1) {
      // this.showToast('Image size must be less than 1 MB \n  يجب أن يكون حجم الصورة أقل من 1 ميجا بايت');
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
          console.log(event.target);
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
