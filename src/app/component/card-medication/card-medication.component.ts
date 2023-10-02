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
  @Input() isHidden: boolean = true;

  constructor() {}

  ngOnInit() {
    this.medication_name = 'Paracetamol';
    this.disp = 'Dispense';
    this.sig = 'Sig';
  }

  markAsDone(event: any) {
    this.isHidden = !this.isHidden;
  }
}
