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

  constructor(private formBuilder: FormBuilder,
              private backendService: BackendService) { }

  ngOnInit() {
    // retrieve the next page of mails starting from the last mail in the array
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
    this.gameForm = this.formBuilder.group({
      answer: ''
    });
  }

  public getTranslation(): string {
    return this.word.translation;
  }

  public getWord(): string {
    return this.word.foreign;
  }

  public startGame() {
    this.pickRandomWord();
  }

  public pickRandomWord() {
    const index: number = Math.floor( Math.random() * this.words.length );
    this.word = this.words[index];
  }

  onSubmit() {
    const formModel = this.gameForm.value;
    if (formModel.answer === this.getTranslation()) {
      this.result = this.getTranslation() + ' was correct!';
    } else {
      this.result = this.getTranslation() + ' was wrong!';
    }
    this.pickRandomWord();
  }

}
