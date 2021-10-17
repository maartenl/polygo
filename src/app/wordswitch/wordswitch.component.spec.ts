import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordswitchComponent } from './wordswitch.component';

describe('WordswitchComponent', () => {
  let component: WordswitchComponent;
  let fixture: ComponentFixture<WordswitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordswitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
