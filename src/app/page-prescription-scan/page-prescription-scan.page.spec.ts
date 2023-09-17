import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagePrescriptionScanPage } from './page-prescription-scan.page';

describe('PagePrescriptionScanPage', () => {
  let component: PagePrescriptionScanPage;
  let fixture: ComponentFixture<PagePrescriptionScanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PagePrescriptionScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
