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
  lessonId = new FormControl('');

  gameForm: FormGroup;

  words: Word[] = [];

  word: Word | undefined = undefined;

  success: boolean = true;
  
  result: string | undefined = undefined;

  correct = 0;
  wrong = 0;

  /**
   * Indicates that the foreign word is required as the answer.
   */
  needTranslation: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private backendService: BackendService) { 
    this.gameForm = this.formBuilder.group({
      answer: ''
    });
  }

  ngOnInit(): void {
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
    if (this.word === undefined) {
      return "";
    }
    if (this.needTranslation) {
      return this.word.foreign;
    }
    return this.word.translation;
  }

  public getWord(): string {
    if (this.word === undefined) {
      return "";
    }
    if (this.needTranslation) {
      return this.word.translation;
    }
    return this.word.foreign;
  }

  public startGame() {
    this.pickRandomWord();
  }
  
  public getWords(): Word[] {
    if (this.words === undefined) {
      return [];
    }
    if (String(this.lessonId.value).trim() === '') {
      return this.words;
    }
    const lessons = String(this.lessonId.value).split(',').map(x => Number(x));
    const result = this.words.filter(word => lessons.some(x => Number(word.lesson) === x));
    return result;
  }

  public pickRandomWord() {
    const filteredWords = this.getWords();
    this.needTranslation = Math.floor( Math.random() * 2) === 1;
    const index: number = Math.floor( Math.random() * filteredWords.length );
    this.word = filteredWords[index];
  }

  onSubmit() {
    const formModel = this.gameForm.value;
    if (formModel.answer.trim().toLocaleLowerCase() === this.getTranslation().trim().toLocaleLowerCase()) {
      this.result = this.getTranslation() + ' was correct!';
      this.success = true;
      this.correct++;
    } else {
      this.result = formModel.answer + ' was wrong! Should have been ' + this.getTranslation() + '.';
      this.success = false;
      this.wrong++;
    }
    this.resetForm();
    this.pickRandomWord();
  }

}
