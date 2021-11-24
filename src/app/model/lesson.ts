export class Lesson {
  id: number;
  creation: Date;
  modification: Date;
  lesson: string;
  comments: string | undefined;

  constructor(object: any) {
    this.id = object.id;
    this.creation = object.creation;
    this.modification = object.modification;
    this.lesson = object.lesson;
    this.comments = object.comments;
  }
}
