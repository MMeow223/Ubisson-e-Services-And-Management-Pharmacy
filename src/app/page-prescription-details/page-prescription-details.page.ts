import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CapacitorHttp } from '@capacitor/core';
import { authorisedFetch, loginHelper } from '../helper/apiHelper';
import { CardMedicationComponent } from '../component/card-medication/card-medication.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-prescription-details',
  templateUrl: './page-prescription-details.page.html',
  styleUrls: ['./page-prescription-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CardMedicationComponent],
})
export class PagePrescriptionDetailsPage implements OnInit {
  scanResult: string;
  prescription: any;
  buttonDisabled: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.scanResult = '';
  }

  async ngOnInit() {
    await loginHelper('2', 'richardreed', '12345678');

    const navParams = history.state.item || '';
    if (navParams.startsWith('$Biotective$')) {
      let response = await authorisedFetch(
        'v1/pharmacist/prescription',
        'POST',
        {
          prescription: navParams,
        }
      );
      console.log(response, response?.data);
      if (response == null || response?.data == null) {
        alert('Invalid QR code');
        this.router.navigate(['/page-prescription-scan']);
      } else {
        this.scanResult = JSON.stringify(response.data);
      }
    }
  }

  generateQuickGuid() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  allChecked(event: any) {
    let alertIcon = document.getElementsByClassName('alert-icon');
    if (alertIcon.length > 0) {
      alertIcon[0].remove();
    }

    alertIcon = document.getElementsByClassName('alert-icon');

    if (alertIcon.length == 0) {
      this.buttonDisabled = false;
    }
  }

  async uploadEvidence(fileChangeEvent: any) {
    const photo = fileChangeEvent.target.files[0];

    try {
      let atResponse = await authorisedFetch('firebase/token', 'GET');

      const access_token = atResponse?.data.access_token;

      const headers = {
        'Content-Type': photo.type,
        Authorization: `Bearer ${access_token}`,
        'X-Goog-Upload-Header-Content-Type': photo.type,
        'X-Goog-Upload-Header-Content-Length': photo.size,
      };

      const {
        data: { selfLink },
      } = await CapacitorHttp.request({
        method: 'POST',
        url: `https://storage.googleapis.com/upload/storage/v1/b/${
          environment.firebaseProject
        }/o?uploadType=media&name=prescription/${this.generateQuickGuid()}_${
          photo.name
        }`,
        headers: headers,
        data: photo,
      });

      let response = await authorisedFetch(
        'v1/pharmacist/prescription/evidence',
        'POST',
        {
          id: this.prescription.id,
          medication_id: this.prescription.medication_id,
          url: selfLink,
        }
      );

      return selfLink;
    } catch (error) {
      throw error;
    }
  }
}
