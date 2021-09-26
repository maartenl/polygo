import { Component, OnInit } from '@angular/core';
import { Lesson } from '../model/lesson';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  lessons: Lesson[] = [];

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.loadLessons();
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

}
