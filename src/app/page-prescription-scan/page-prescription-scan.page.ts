import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-page-prescription-scan',
  templateUrl: './page-prescription-scan.page.html',
  styleUrls: ['./page-prescription-scan.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PagePrescriptionScanPage implements OnDestroy {

  content_visibility: string;

  constructor() {
    this.content_visibility = 'show';
  }

  startScan = async () => {
    // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });
  
    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    document.querySelector('body')!.classList.add('scanner-active');
    this.content_visibility = 'hidden';
    BarcodeScanner.hideBackground();
  
    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
    }
    
  };

  stopScan = () => {
    BarcodeScanner.showBackground();
    document.querySelector('body')!.classList.remove('scanner-active');
    this.content_visibility = 'show';
    BarcodeScanner.stopScan();
  };

  ngOnDestroy(): void {
    this.stopScan();
  }
}
