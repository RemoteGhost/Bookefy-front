import { Component, OnInit } from '@angular/core';
import {Book} from "../model/book";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books!: Book[];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllBooksNoContent()
  }

  getAllBooksNoContent() {
    this.http.get<Book[]>("/api/books").subscribe(
      res => {
        this.books = res
      },
      error => {
        alert(error)
  })
  }

}
