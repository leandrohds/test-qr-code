import {Component} from '@angular/core';

import {QRScanner} from '@ionic-native/qr-scanner/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
    providers: [QRScanner, ToastController]
})
export class Tab2Page {

  constructor(private qrScanner: QRScanner, public toastController: ToastController) {}

  async escanear() {
      try {
        const status = await this.qrScanner.getStatus();

        if (status.showing) {
            return;
        }


        const permissao = await this.qrScanner.prepare();

        if (permissao.authorized) {


            alert(status.showing);

            const toast1 = await this.toastController.create({
                message: 'Autorizou',
                duration: 2000
            });
            toast1.present();

            this.qrScanner.show();

            (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');

            const scanSub = this.qrScanner.scan()
                .subscribe(async (text: string) => {

                window.document.querySelector('ion-app').classList.remove('cameraView');

                const toast = await this.toastController.create({
                    message: text,
                    duration: 2000
                });
                toast.present();

                (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');

                this.qrScanner.hide(); // hide camera preview
                scanSub.unsubscribe(); // stop scanning
            });
        }

      } catch (e) {
          const toastError = await this.toastController.create({
              message: 'Deu zebra' +  e.message,
              duration: 2000
          });
          toastError.present();
      }
  }

}
