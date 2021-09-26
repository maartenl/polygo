import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Word } from '../model/word';
import { BackendService } from '../backend.service';
import { Lesson } from '../model/lesson';

@Component({
  selector: 'app-wordgame-timed',
  templateUrl: './wordgame-timed.component.html',
  styleUrls: ['./wordgame-timed.component.css']
})
export class WordgameTimedComponent implements OnInit {
  lessonId = new FormControl('');

  result: string | undefined = undefined;
  
  words: Word[] = [];

  word: Word | undefined = undefined;

  firstWord: Word = new Word(0, new Date(), new Date(), "", "", 0);
  secondWord: Word = new Word(0, new Date(), new Date(), "", "", 0);
  thirdWord: Word = new Word(0, new Date(), new Date(), "", "", 0);
  fourthWord: Word = new Word(0, new Date(), new Date(), "", "", 0);

  success: boolean = true;

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

  public pickRandomWord() {
    const filteredWords = this.getWords();
    this.needTranslation = Math.floor(Math.random() * 2) === 1;
    const words = [filteredWords[Math.floor(Math.random() * filteredWords.length)],
    filteredWords[Math.floor(Math.random() * filteredWords.length)],
    filteredWords[Math.floor(Math.random() * filteredWords.length)],
    filteredWords[Math.floor(Math.random() * filteredWords.length)]];
    this.firstWord = words[0];
    this.secondWord = words[1];
    this.thirdWord = words[2];
    this.fourthWord = words[3];
    const index: number = Math.floor(Math.random() * 4);
    this.word = words[index];
  }

  public clicked(buttonId: number) {
    let answer: string = "";
    if (buttonId === 1) {
      answer = this.getFirst();
    }
    if (buttonId === 2) {
      answer = this.getSecond();
    }
    if (buttonId === 3) {
      answer = this.getThird();
    }
    if (buttonId === 4) {
      answer = this.getFourth();
    }
    if (answer === this.getTranslation()) {
      this.result = this.getTranslation() + ' was correct!';
      this.success = true;
    } else {
      this.result = answer + ' was wrong! Should have been ' + this.getTranslation() + '.';
      this.success = false;
    }
    this.pickRandomWord();
  }

  private getPrivateWord(word: Word): string {
    if (word === undefined) {
      return '';
    }
    if (this.needTranslation) {
      return word.foreign;
    } else {
      return word.translation;
    }
  }

  public getFirst(): string {
    return this.getPrivateWord(this.firstWord);
  }

  public getSecond(): string {
    return this.getPrivateWord(this.secondWord);
  }

  public getThird(): string {
    return this.getPrivateWord(this.thirdWord);
  }

  public getFourth(): string {
    return this.getPrivateWord(this.fourthWord);
  }

}
