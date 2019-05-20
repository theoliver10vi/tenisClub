import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrochureViewComponent } from './brochure-view.component';

describe('BrochureViewComponent', () => {
  let component: BrochureViewComponent;
  let fixture: ComponentFixture<BrochureViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrochureViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrochureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
