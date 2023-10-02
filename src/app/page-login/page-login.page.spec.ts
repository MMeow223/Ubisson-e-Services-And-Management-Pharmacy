import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageLoginPage } from './page-login.page';

describe('PageLoginPage', () => {
  let component: PageLoginPage;
  let fixture: ComponentFixture<PageLoginPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PageLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
