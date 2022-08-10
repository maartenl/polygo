import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Word } from '../model/word';
import { BackendService } from '../backend.service';
import { Lesson } from '../model/lesson';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {
  lessonId = new FormControl(0);

  searchWord: string | undefined = undefined;

  foundWords: Word[] = [];

  words: Word[] = [];

  lessons: Lesson[] = [];

  constructor(private formBuilder: FormBuilder,
    private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.loadLessons();
    this.loadWords();

  }

  private loadWords() {
    this.backendService.getWords().subscribe((result: Word[]) => {
      if (result !== undefined && result.length !== 0) {
        this.words = result;
      }
    }, (err: any) => {
      console.log('error', err);
    }, () => {
    });
  }

  private loadLessons() {
    this.backendService.getLessons().subscribe((result: Lesson[]) => {
      if (result !== undefined && result.length !== 0) {
        this.lessons = result;
      }
    }, (err: any) => {
      console.log('error', err);
    }, () => {
    });
  }

  public getWords(): Word[] {
    if (this.lessonId.value === '0') {
      return this.words;
    }
    const result = this.words.filter(word => word.lesson === this.lessonId.value);
    return result;
  }

  onEvent() {
    if (this.searchWord == undefined) {
      return;
    }
    const searchWord: string = this.searchWord;
    if (searchWord.length < 1) {
      this.foundWords = [];
      return;
    }
    if (searchWord.length == 1) {
      this.foundWords = []
      const foundWord: Word | undefined = this.words.find(word => word.foreign === searchWord || word.translation === searchWord)
      if (foundWord !== undefined) { this.foundWords.push(); }
      return;
    }
    const exactMatch = this.words.filter(word => word.foreign === searchWord || word.translation === searchWord);
    const partialMatch = this.words.filter(word => (word.foreign.includes(searchWord) || word.translation.includes(searchWord)) && word.foreign !== searchWord && word.translation !== searchWord);
    this.foundWords = exactMatch.concat(partialMatch);
  }

}
