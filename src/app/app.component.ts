import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'polygo';
  links = [
  { title: 'Wordgame', fragment: '/wordgame' },
  { title: 'Wordgame (MC)', fragment: '/wordgame-timed' },
  { title: 'Wordswitch', fragment: '/wordswitch' },
  { title: 'Lessons', fragment: '/lessons' },
  { title: 'Words', fragment: '/words' },
  ];
  
  constructor(public route: ActivatedRoute) {}
}
