import { Component, OnInit } from '@angular/core';

import { ErrorMessage } from '../model/error-message';
import { ErrorsService } from '../errors.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  constructor(private errorsService: ErrorsService) { }

  ngOnInit(): void {
  }

  clear() {
    this.errorsService.clearErrors();
  }
    
  getErrors(): ErrorMessage[] {
    return this.errorsService.getErrors();
  }
  
  hasErrors(): Boolean {
    return this.errorsService.getErrors().length > 0;
  }

}
