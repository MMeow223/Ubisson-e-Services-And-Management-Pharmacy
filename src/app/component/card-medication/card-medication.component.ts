import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card-medication',
  templateUrl: './card-medication.component.html',
  styleUrls: ['./card-medication.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class CardMedicationComponent implements OnInit {
  @Input() image: any;
  @Input() title: any;
  @Input() description: any;
  // @Input() url: any;
  @Input() checked: boolean = false;

  @Input() medication_name: any;
  @Input() disp: any;
  @Input() sig: any;
  @Input() refill: any;

  constructor() {}

  ngOnInit() {
    this.medication_name = 'Medication Name 12344556 555';
    this.disp = 'Dispense';
    this.sig = 'Sig';
  }
}
