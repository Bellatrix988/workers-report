export class Task {
  id: number;
  title: string;
  isActive: boolean;

  constructor (id: number, title: string, isActive:  boolean) {
    this.id = id;
    this.title = title;
    this.isActive = isActive;
  }
}
