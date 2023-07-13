export class Note {
  public id: number
  public book: number
  public user: number
  public notes: string

  constructor(id: number, book: number, user:number, notes:string) {
    this.id = id;
    this.book = book;
    this.user = user;
    this.notes = notes;
  }

}
