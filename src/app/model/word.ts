export class Word {
  id: number;
  creation: Date;
  modification: Date;
  translation: string;
  foreign: string;
  lesson: number;
  comments: string | undefined;
  
  constructor(object: any) {
    this.id = object.id;
    this.creation = object.creation;
    this.modification = object.modification;
    this.translation = object.translation;
    this.foreign = object.foreign;
    this.lesson = object.lesson;
    this.comments = object.comments;
  }
}
