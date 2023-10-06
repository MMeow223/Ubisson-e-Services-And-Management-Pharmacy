import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import {
  fetchWithCSRF,
  forgotPasswordHelper,
  loginHelper,
} from '../helper/apiHelper';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage implements OnInit {
  user: string;

  constructor() {
    this.user = 'User';
  }

  ngOnInit(): void {}

  // startScan = async () => {
  //   // Check camera permission
  //   // This is just a simple example, check out the better checks below
  //   await BarcodeScanner.checkPermission({ force: true });

  //   // make background of WebView transparent
  //   // note: if you are using ionic this might not be enough, check below
  //   BarcodeScanner.hideBackground();

  //   const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

  //   // if the result has content
  //   if (result.hasContent) {
  //     console.log(result.content); // log the raw scanned content
  //   }
  // };

  // stopScan = () => {
  //   BarcodeScanner.showBackground();
  //   BarcodeScanner.stopScan();
  // };

  // ngOnDestroy(): void {
  //   this.stopScan();
  // }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
