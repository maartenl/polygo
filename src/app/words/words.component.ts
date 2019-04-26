import { Component, OnInit } from '@angular/core';
import { Word } from '../model/word';
import { BackendService } from '../backend.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Lesson } from '../model/lesson';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {
  lessonId = new FormControl(0);

  wordForm: FormGroup;

  words: Word[];

  lessons: Lesson[];

  word: Word;

  constructor(private formBuilder: FormBuilder,
              private backendService: BackendService) { }

  ngOnInit() {
    this.word = new Word();
    this.loadWords();
    this.loadLessons();
    this.resetForm();
  }

  private loadWords() {
    this.backendService.getWords().subscribe((result: Word[]) => {
      if (result !== undefined && result.length !== 0) {
        this.words = result;
      }
    }, (err: any) => {
      // console.log('error', err);
    }, () => {
    });
  }

  private loadLessons() {
    this.backendService.getLessons().subscribe((result: Lesson[]) => {
      if (result !== undefined && result.length !== 0) {
        this.lessons = result;
      }
    }, (err: any) => {
      // console.log('error', err);
    }, () => {
    });
  }

  resetForm() {
    this.wordForm = this.formBuilder.group({
      foreign: '',
      translation: '',
      lesson: ''
    });
  }

  public setWord(word: Word) {
    this.word = word;
    this.wordForm = this.formBuilder.group({
      foreign: word.foreign,
      translation: word.translation,
      lesson: word.lesson
    });
  }

  public onSubmit() {
    const formModel = this.wordForm.value;
    this.word.foreign = formModel.foreign;
    this.word.translation = formModel.translation;
    this.word.lesson = formModel.lesson;
    this.backendService.updateWord(this.word).subscribe(
      (result: any) => { // on success
        this.loadWords();
      },
      (err: any) => { // error
        // console.log('error', err);
      },
      () => { // on completion
      }
    );

  }

  public getWords(): Word[] {
    if (this.words === undefined) {
      return [];
    }
    if (this.lessonId.value === '0') {
      return this.words;
    }
    const result = this.words.filter(word => word.lesson === this.lessonId.value);
    return result;
  }

  public cancel() {
    const lessonId = this.word.lesson;
    this.word = new Word();
    this.wordForm = this.formBuilder.group({
      foreign: '',
      translation: '',
      lesson: lessonId
    });
  }
}
