import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CapacitorHttp } from '@capacitor/core';
import { authorisedFetch, loginHelper } from '../helper/apiHelper';
import { CardMedicationComponent } from '../component/card-medication/card-medication.component';
import { environment } from 'src/environments/environment';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import axios from 'axios';

@Component({
  selector: 'app-page-prescription-details',
  templateUrl: './page-prescription-details.page.html',
  styleUrls: ['./page-prescription-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CardMedicationComponent],
})
export class PagePrescriptionDetailsPage implements OnInit {
  prescription_id: any;
  patient_name: any;
  patient_identity_no: any;
  medications: any;
  loading: any;
  claimed: boolean = true;
  buttonDisabled: boolean = true;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private loadingController: LoadingController
  ) {
  }

  async ngOnInit() {
    const navParams = history.state.item || '';
    if (navParams.startsWith('$Biotective$')) {
      this.loading = await this.loadingController.create({
        message: 'Fetching prescription...',
        spinner: 'crescent'
      });
      this.loading.present();
      let response = await authorisedFetch(
        'v1/pharmacist/prescription',
        'POST',
        {
          prescription: navParams,
        }
      )
      await this.loading.dismiss();
      if (response?.status != 200) {
        alert('Invalid QR code');
        this.router.navigate(['/page-prescription-scan']);
      }
      if (response == null || response?.data == null || response?.data?.data == null) {
        alert('Invalid QR code');
        this.router.navigate(['/page-prescription-scan']);
      } else {
        this.patient_name = response.data.name;
        this.patient_identity_no = response.data.identityNo;
        this.medications = response.data.data;
        this.prescription_id = response.data.data[0].id;
        if (response.data.data[0].claimed == 0) {
          this.claimed = false;
        }
        console.log(this.medications);
      }
    }
  }

  generateQuickGuid() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  async captureEvidence() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos // Camera, Photos or Prompt!
    });
  }

  b64toBlob(b64Data: string, contentType: string) {
    contentType = contentType || '';
    const sliceSize = 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  allChecked(event: any) {
    var alertIcon = event.currentTarget.querySelector('.alert-icon');
    if (alertIcon) {
      alertIcon.remove();
    }

    alertIcon = document.getElementsByClassName('alert-icon');

    if (alertIcon.length == 0) {
      this.buttonDisabled = false;
    }
  }

  async uploadEvidence() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });

      if (photo == null) {
        return;
      }

      this.loading = await this.loadingController.create({
        message: 'Uploading evidence...',
        spinner: 'crescent'
      });
      this.loading.present();

      const base64Data = photo.base64String;
      const contentType = 'image/jpeg';
      const fileName = `${this.generateQuickGuid()}.jpg`;

      let atResponse = await authorisedFetch('firebase/token', 'POST');
      const access_token = JSON.parse(atResponse?.data).access_token;

      var blob = this.b64toBlob(base64Data!, contentType);
      var file = new File([blob], fileName, {type: contentType});

      const headers = {
        'Content-Type': contentType,
        Authorization: `Bearer ${access_token}`,
        'X-Goog-Upload-Header-Content-Type': contentType,
        'X-Goog-Upload-Header-Content-Length': `${file.size}`,
      };
      
      const { data: { selfLink } } = await axios.post(
        `https://storage.googleapis.com/upload/storage/v1/b/${environment.firebaseProject}/o?uploadType=media&name=prescription/${fileName}`,
        file,
        { headers }
      );

      let response = await authorisedFetch(
        'v1/pharmacist/prescription/evidence',
        'POST',
        {
          id: this.prescription_id,
          url: selfLink,
        }
      );
      await this.loading.dismiss();
      if (response?.status == 200) {
        alert('Evidence uploaded successfully');
        this.router.navigate(['/page-prescription-scan']);
      } else {
        alert('Failed to upload evidence');
      }

    } catch (error) {
      await this.loading.dismiss();
      throw error;
    }
  }
}
