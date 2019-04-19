import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordgameTimedComponent } from './wordgame-timed.component';

describe('WordgameTimedComponent', () => {
  let component: WordgameTimedComponent;
  let fixture: ComponentFixture<WordgameTimedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordgameTimedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordgameTimedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
