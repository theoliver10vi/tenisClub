import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsJugadoresComponent } from './cards-players.component';

describe('CardsJugadoresComponent', () => {
  let component: CardsJugadoresComponent;
  let fixture: ComponentFixture<CardsJugadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsJugadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsJugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
