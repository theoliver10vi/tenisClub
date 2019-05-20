import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchScoreInfoComponent } from './match-score-info.component';

describe('MatchScoreInfoComponent', () => {
  let component: MatchScoreInfoComponent;
  let fixture: ComponentFixture<MatchScoreInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchScoreInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchScoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
