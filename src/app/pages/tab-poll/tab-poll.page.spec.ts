import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPollPage } from './tab-poll.page';

describe('TabPollPage', () => {
  let component: TabPollPage;
  let fixture: ComponentFixture<TabPollPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPollPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
