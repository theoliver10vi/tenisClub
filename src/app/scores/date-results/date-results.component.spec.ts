import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateResultsComponent } from './date-results.component';

describe('DateResultsComponent', () => {
  let component: DateResultsComponent;
  let fixture: ComponentFixture<DateResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
