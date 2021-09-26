export class Lesson {
  id: number;
  creation: Date;
  modification: Date;
  lesson: string;
  
  constructor (id: number, creation: Date, modification: Date, lesson: string) {
    this.id = id;
    this.creation = creation;
    this.modification = modification;
    this.lesson = lesson;
  }
}
