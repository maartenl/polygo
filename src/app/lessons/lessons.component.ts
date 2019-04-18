import { Component, OnInit } from '@angular/core';
import { Lesson } from '../model/lesson';
import { BackendService } from '../backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  lessonForm: FormGroup;

  lessons: Lesson[];

  lesson: Lesson;

  constructor(private formBuilder: FormBuilder,
              private backendService: BackendService) { }

  ngOnInit() {
    this.lesson = new Lesson();
    this.loadLessons();
    this.resetForm();
  }

  private loadLessons() {
    this.backendService.getLessons().subscribe((result: Lesson[]) => {
      if (result !== undefined && result.length !== 0) {
        this.lessons = result;
        console.log(this.lessons);
      }
    }, (err: any) => {
      // console.log('error', err);
    }, () => {
    });
  }

  resetForm() {
    this.lessonForm = this.formBuilder.group({
      lesson: ''
    });
  }

  public setLesson(lesson: Lesson) {
    this.lesson = lesson;
    this.lessonForm = this.formBuilder.group({
      lesson: lesson.lesson
    });
  }

  public onSubmit() {
    const formModel = this.lessonForm.value;
    this.lesson.lesson = formModel.lesson;
    this.backendService.updateLesson(this.lesson).subscribe(
      (result: any) => { // on success
        this.loadLessons();
      },
      (err: any) => { // error
        // console.log('error', err);
      },
      () => { // on completion
      }
    );

  }

  public cancel() {
    this.lesson = new Lesson();
    this.lessonForm = this.formBuilder.group({
      lesson: ''
    });
  }
}
