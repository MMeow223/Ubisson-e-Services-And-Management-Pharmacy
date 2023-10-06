import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { forgotPasswordHelper } from '../helper/apiHelper';

@Component({
  selector: 'app-page-prescription-scan',
  templateUrl: './page-prescription-scan.page.html',
  styleUrls: ['./page-prescription-scan.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PagePrescriptionScanPage implements OnDestroy {
  scanActive: boolean;

  constructor(public navCtrl: NavController) {
    this.scanActive = true;
  }

  ngOnInit() {
    this.startScan();
  }

  startScan = async () => {
    // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    document.querySelector('body')!.classList.add('scanner-active');
    this.scanActive = true;
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      this.stopScan();
      if (result.content.startsWith('$Biotective$')) {
        this.navCtrl.navigateForward(`/page-prescription-details`, {
          state: { item: result.content },
        });
      } else {
        alert('Invalid QR code');
        this.stopScan();
      }
    }
  };

  stopScan = () => {
    BarcodeScanner.showBackground();
    document.querySelector('body')!.classList.remove('scanner-active');
    this.scanActive = false;
    BarcodeScanner.stopScan();
  };

  logout() {
      localStorage.removeItem('token');
      this.navCtrl.navigateForward(`/page-login`);
  
  }

  ngOnDestroy(): void {
    this.stopScan();
  }

  back() {
    this.navCtrl.navigateBack(`/home`);
  }
}
