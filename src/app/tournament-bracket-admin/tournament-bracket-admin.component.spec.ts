import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentBracketAdminComponent } from './tournament-bracket-admin.component';

describe('TournamentBracketAdminComponent', () => {
  let component: TournamentBracketAdminComponent;
  let fixture: ComponentFixture<TournamentBracketAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TournamentBracketAdminComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentBracketAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
