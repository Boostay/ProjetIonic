import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotifNewPage } from './notif-new.page';

describe('NotifNewPage', () => {
  let component: NotifNewPage;
  let fixture: ComponentFixture<NotifNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotifNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
