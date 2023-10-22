import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
  // @Input() url: any;
  @Input() checked: boolean = false;

  @Input() medication_name: any;
  @Input() disp: any;
  @Input() sig: any;
  @Input() isHidden: boolean = true;

  constructor() {}

  ngOnInit() {
  }

  markAsDone(event: any) {
    this.isHidden = !this.isHidden;
  }
}
