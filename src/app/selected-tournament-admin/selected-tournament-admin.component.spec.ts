import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTournamentAdminComponent } from './selected-tournament-admin.component';

describe('SelectedTournamentAdminComponent', () => {
  let component: SelectedTournamentAdminComponent;
  let fixture: ComponentFixture<SelectedTournamentAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedTournamentAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedTournamentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
