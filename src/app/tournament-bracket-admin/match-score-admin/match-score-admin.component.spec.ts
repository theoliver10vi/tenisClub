import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchScoreAdminComponent } from './match-score-admin.component';

describe('MatchScoreAdminComponent', () => {
  let component: MatchScoreAdminComponent;
  let fixture: ComponentFixture<MatchScoreAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchScoreAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchScoreAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
