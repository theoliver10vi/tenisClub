import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentBracketInfoComponent } from './tournament-bracket-info.component';

describe('TournamentBracketInfoComponent', () => {
  let component: TournamentBracketInfoComponent;
  let fixture: ComponentFixture<TournamentBracketInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentBracketInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentBracketInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
