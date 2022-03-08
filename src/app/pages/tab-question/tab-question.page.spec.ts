import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabQuestionPage } from './tab-question.page';

describe('TabQuestionPage', () => {
  let component: TabQuestionPage;
  let fixture: ComponentFixture<TabQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabQuestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
