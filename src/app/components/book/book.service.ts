import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Book } from "../model/book";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books!: Book[]

  constructor(private http: HttpClient) {
  }

  getBook(id: number) {
    let url = "/api/books/" + id.toString()
    return this.http.get<Book>(url)
  }
}
