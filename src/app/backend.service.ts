import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { ErrorsService } from './errors.service';
import { Word } from './model/word';
import { ErrorMessage } from './model/error-message';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  url: string;

  constructor(private http: HttpClient, private errorsService: ErrorsService) {
    this.url = 'api/words';
  }

  public getWords(): Observable<any> {
    return this.http.get<Word[]>(this.url)
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
      const errormessage = new ErrorMessage();
      errormessage.message = error.error.message;
      errormessage.type = 'Network Error';
      this.errorsService.addError(errormessage);
  } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      const errormessage = new ErrorMessage();
      errormessage.message = error.error.errormessage;
      if (error.error.errormessage === undefined) {
        errormessage.message = error.statusText;
      }
      errormessage.type = error.status.toString();
      this.errorsService.addError(errormessage);
    }
  }
}
