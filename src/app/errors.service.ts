import { Injectable } from '@angular/core';

import { ErrorMessage } from './model/error-message';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  errors: ErrorMessage[] = [];

  constructor() { }

  addError(errormessage: ErrorMessage): any {
    this.errors.push(errormessage); 
  }

  getErrors(): ErrorMessage[] {
    return this.errors;
  }
  
  clearErrors() {
    this.errors = [];
  }

}
