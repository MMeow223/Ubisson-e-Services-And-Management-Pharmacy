import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagePrescriptionDetailsPage } from './page-prescription-details.page';

describe('PagePrescriptionDetailsPage', () => {
  let component: PagePrescriptionDetailsPage;
  let fixture: ComponentFixture<PagePrescriptionDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PagePrescriptionDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
