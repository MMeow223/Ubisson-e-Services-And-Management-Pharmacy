import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageRewardDetailsPage } from './page-reward-details.page';

describe('PageRewardDetailsPage', () => {
  let component: PageRewardDetailsPage;
  let fixture: ComponentFixture<PageRewardDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PageRewardDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
