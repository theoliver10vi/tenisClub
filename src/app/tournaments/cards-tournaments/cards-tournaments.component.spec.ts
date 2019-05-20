import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsTorneosComponent } from './cards-tournaments.component';

describe('CardsTorneosComponent', () => {
  let component: CardsTorneosComponent;
  let fixture: ComponentFixture<CardsTorneosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsTorneosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsTorneosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
