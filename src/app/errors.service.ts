import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  addError(errormessage: import("./model/error-message").ErrorMessage): any {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
