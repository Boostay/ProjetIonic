import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotifsListPage } from './notifs-list.page';

describe('NotifsListPage', () => {
  let component: NotifsListPage;
  let fixture: ComponentFixture<NotifsListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotifsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
