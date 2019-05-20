import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerLoggedComponent } from './player-logged.component';

describe('PlayerLoggedComponent', () => {
  let component: PlayerLoggedComponent;
  let fixture: ComponentFixture<PlayerLoggedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerLoggedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
