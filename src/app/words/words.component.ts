import { Component, OnInit } from '@angular/core';
import { Word } from '../model/word';
import { BackendService } from '../backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {

  wordForm: FormGroup;

  words: Word[];

  word: Word;

  constructor(private formBuilder: FormBuilder,
              private backendService: BackendService) { }

  ngOnInit() {
    this.word = new Word();
    this.loadWords();
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
