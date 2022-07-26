import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Word } from '../model/word';
import { BackendService } from '../backend.service';
import { Lesson } from '../model/lesson';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-wordswitch',
  templateUrl: './wordswitch.component.html',
  styleUrls: ['./wordswitch.component.css']
})
export class WordswitchComponent implements OnInit {
  lessonId = new FormControl('');

  words: Word[] = [];
  questions: Word[] = [];
  answers: string[] = [];
  useranswers: string[] = [];

  results: string[] | undefined = undefined;

  success: boolean = true;

  correct = 0;
  wrong = 0;

  /**
   * Indicates that the foreign word is required as the answer.
   */
   needTranslation: boolean = true;

   constructor(private backendService: BackendService) { }

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
  }

  public getWords(): Word[] {
    if (String(this.lessonId.value).trim() === '') {
      return this.words;
    }
    const lessons = String(this.lessonId.value).split(',').map(x => Number(x));
    const result = this.words.filter(word => lessons.some(x => Number(word.lesson) === x));
    return result;
  }

  public getTranslation(word: Word): string {
    if (word === undefined) {
      return "";
    }
    if (this.needTranslation) {
      return word.foreign;
    }
    return word.translation;
  }

  public getWord(word: Word): string {
    if (word === undefined) {
      return "";
    }
    if (!this.needTranslation) {
      return word.foreign;
    }
    return word.translation;
  }

  public startGame() {
    this.pickRandomWord();
  }

  public pickRandomWord() {
    const filteredWords = [...this.getWords()];
    this.questions = [];
    this.answers = [];
    this.needTranslation = Math.floor(Math.random() * 2) === 1;

    for (let count = 0; count < 8; count++) {
      let position: number = Math.floor(Math.random() * filteredWords.length);
      this.questions.push(filteredWords[position])
      this.answers.push(this.getTranslation(filteredWords[position]))
      filteredWords.splice(position, 1)  
    }

    // randomize the answers
    for (let count = 0; count < 90; count++) {
      let first: number = Math.floor(Math.random() * this.answers.length);
      let second: number = Math.floor(Math.random() * this.answers.length);
      let cache = this.answers[first];
      this.answers[first] = this.answers[second];
      this.answers[second] = cache;
    }
  }

  public clickUp(buttonId: number) {
    if (buttonId === 0) {
      return;
    }
    let cache = this.answers[buttonId]
    this.answers[buttonId] = this.answers[buttonId-1]
    this.answers[buttonId-1] = cache;
  }

  public clickDown(buttonId: number) {
    if (buttonId === this.answers.length - 1) {
      return;
    }
    let cache = this.answers[buttonId]
    this.answers[buttonId] = this.answers[buttonId+1]
    this.answers[buttonId+1] = cache;
  }

  public submit() {
    this.results = [];
    for (let i in this.questions)
    {
      if (this.useranswers[i] !== this.getTranslation(this.questions[i])) {
        this.results.push(this.useranswers[i] + ' was wrong! Translation of ' + this.getWord(this.questions[i]) + ' is ' + this.getTranslation(this.questions[i]) + '.');
      }
    }
    if (this.results.length === 0) {
      this.success = true;
      this.correct++;
      this.results == undefined;
    } else {
      this.success = false;
      this.wrong++;
    }
    this.pickRandomWord();
    this.clear();
  }

  public setAnswer(word: string) {
    this.useranswers.push(word)
  }

  public getUseranswer(i: number) {
    if (i < this.useranswers.length) {
      return this.useranswers[i];
    }
    return '';
  }

  public clear() {
    this.useranswers = [];
  }

}
