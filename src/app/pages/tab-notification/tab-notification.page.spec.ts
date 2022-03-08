import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabNotificationPage } from './tab-notification.page';

describe('TabNotificationPage', () => {
  let component: TabNotificationPage;
  let fixture: ComponentFixture<TabNotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabNotificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
