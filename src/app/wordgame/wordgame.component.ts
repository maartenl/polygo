import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-wordgame',
  templateUrl: './wordgame.component.html',
  styleUrls: ['./wordgame.component.css']
})
export class WordgameComponent implements OnInit {

  result: string;

  gameForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.gameForm = this.formBuilder.group({
      answer: ''
    });
  }

  public getTranslation(): string {
    return 'dag';
  }

  public getWord(): string {
    return 'dan';
  }

  onSubmit() {
    const formModel = this.gameForm.value;
    if (formModel.answer === this.getTranslation()) {
      this.result = this.getTranslation() + ' was correct!';
    } else {
      this.result = this.getTranslation() + ' was wrong!';
    }
  }

}
