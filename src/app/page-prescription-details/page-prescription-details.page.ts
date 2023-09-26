import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { authorisedFetch, loginHelper } from '../helper/apiHelper';

@Component({
  selector: 'app-page-prescription-details',
  templateUrl: './page-prescription-details.page.html',
  styleUrls: ['./page-prescription-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PagePrescriptionDetailsPage implements OnInit {
  
  scanResult: string;
  
  constructor(private route: ActivatedRoute, private router: Router) { 
    this.scanResult = '';
  }

  async ngOnInit() {
    await loginHelper("2", "richardreed", "12345678");

    const navParams = history.state.item || "";
    if (navParams.startsWith("\$Biotective\$")) {
      let response = await authorisedFetch("v1/pharmacist/prescription", "POST", {
        "prescription": navParams
      })
      console.log(response, response?.data);
      if (response?.data == null) {
        alert("Invalid QR code");
        this.router.navigate(['/page-prescription-scan']);
      } else {
        this.scanResult = JSON.stringify(response.data);
      }
    }
  }

}
