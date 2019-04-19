import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Word } from '../model/word';

@Component({
  selector: 'app-wordgame',
  templateUrl: './wordgame.component.html',
  styleUrls: ['./wordgame.component.css']
})
export class WordgameComponent implements OnInit {

  result: string;

  gameForm: FormGroup;

  words: Word[];

  word: Word;

  success: boolean;

  /**
   * Indicates that the foreign word is required as the answer.
   */
  needTranslation: boolean;

  constructor(private formBuilder: FormBuilder,
              private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.getWords().subscribe(
      (result: Word[]) => { // on success
        if (result !== undefined && result.length !== 0) {
          this.words = result;
        }
      },
      (err: any) => { // error
        // console.log('error', err);
      },
      () => { // on completion
      }
    );
    this.resetForm();
  }

  resetForm() {
    this.gameForm = this.formBuilder.group({
      answer: ''
    });
  }

  public getTranslation(): string {
    if (this.needTranslation) {
      return this.word.foreign;
    }
    return this.word.translation;
  }

  public getWord(): string {
    if (this.needTranslation) {
      return this.word.translation;
    }
    return this.word.foreign;
  }

  public startGame() {
    this.pickRandomWord();
  }

  public pickRandomWord() {
    this.needTranslation = Math.floor( Math.random() * 2) === 1;
    const index: number = Math.floor( Math.random() * this.words.length );
    this.word = this.words[index];
  }

  onSubmit() {
    const formModel = this.gameForm.value;
    if (formModel.answer === this.getTranslation()) {
      this.result = this.getTranslation() + ' was correct!';
      this.success = true;
    } else {
      this.result = formModel.answer + ' was wrong! Should have been ' + this.getTranslation() + '.';
      this.success = false;
    }
    this.resetForm();
    this.pickRandomWord();
  }

}
