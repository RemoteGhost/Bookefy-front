import { Component, OnInit } from '@angular/core';
import { BookService } from "./book.service";
import { ActivatedRoute } from "@angular/router";
import { Book } from "../model/book";



@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book!: Book;

  constructor(private bookService: BookService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.bookService.getBook(param["id"]).subscribe(
        res => {
          document.getElementById("bookText")!.innerHTML = res.content;
        },
        error => {
          alert(error)
        });
    })

  }
}
