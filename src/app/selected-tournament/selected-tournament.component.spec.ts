import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTournamentComponent } from './selected-tournament.component';

describe('SelectedTournamentComponent', () => {
  let component: SelectedTournamentComponent;
  let fixture: ComponentFixture<SelectedTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
