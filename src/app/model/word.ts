export class Word {
  id: number;
  creation: Date;
  modification: Date;
  translation: string;
  foreign: string;
  lesson: number;
  comments: string | undefined;
  
  constructor(id: number, creation: Date, modification: Date, translation: string, foreign: string, lesson: number, comments: string| undefined) {
    this.id = id;
    this.creation = creation;
    this.modification = modification;
    this.translation = translation;
    this.foreign = foreign;
    this.lesson = lesson;
    this.comments = comments;
  }
}
