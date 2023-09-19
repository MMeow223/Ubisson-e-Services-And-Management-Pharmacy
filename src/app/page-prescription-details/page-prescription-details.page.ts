import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

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
    this.route.queryParams.subscribe(_p => {
      const navParams = this.router.getCurrentNavigation()!.extras.state
      if (navParams) this.scanResult = navParams['item'];
    })
  }

  ngOnInit() {

  }

}
