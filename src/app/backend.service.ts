import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { ErrorsService } from './errors.service';
import { Word } from './model/word';
import { ErrorMessage } from './model/error-message';
import { Lesson } from './model/lesson';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  wordsUrl: string;

  lessonsUrl: string;

  constructor(private http: HttpClient, private errorsService: ErrorsService) {
    this.wordsUrl = '/assets/api/words';
    this.lessonsUrl = '/assets/api/lessons';
  }

  public getWords(): Observable<any> {
    return this.http.get<Word[]>(this.wordsUrl)
    .pipe(
      catchError(err => {
        this.handleError(err);
        return [];
      })
    );
  }

  public getLessons(): Observable<any> {
    return this.http.get<Lesson[]>(this.lessonsUrl)
    .pipe(
      catchError(err => {
        this.handleError(err);
        return [];
      })
    );
  }

  public updateWord(word: Word): any {
    if (word.id !== undefined) {
      // update
      return this.http.put<Word[]>(this.wordsUrl + '/' + word.id, word)
      .pipe(
        catchError(err => {
          this.handleError(err);
          return [];
        })
      );
    }
    // new
    word.foreign = word.foreign.toLocaleLowerCase();
    word.translation = word.translation.toLocaleLowerCase();
    return this.http.post(this.wordsUrl, word)
    .pipe(
      catchError(err => {
        this.handleError(err);
        return [];
      })
    );
  }

  public updateLesson(lesson: Lesson): any {
    if (lesson.id !== undefined) {
      // update
      return this.http.put<Lesson[]>(this.lessonsUrl + '/' + lesson.id, lesson)
      .pipe(
        catchError(err => {
          this.handleError(err);
          return [];
        })
      );
    }
    lesson.lesson = lesson.lesson.toLocaleLowerCase();
    // new
    return this.http.post(this.lessonsUrl, lesson)
    .pipe(
      catchError(err => {
        this.handleError(err);
        return [];
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      const errormessage = new ErrorMessage(error.error.message, "Network Error");
      this.errorsService.addError(errormessage);
  } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      const errormessage = new ErrorMessage(error.error.errormessage ?? error.statusText, error.status.toString());
      this.errorsService.addError(errormessage);
    }
  }
}
