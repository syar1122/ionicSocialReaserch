import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsModalPage } from './settings-modal.page';

describe('SettingsModalPage', () => {
  let component: SettingsModalPage;
  let fixture: ComponentFixture<SettingsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
