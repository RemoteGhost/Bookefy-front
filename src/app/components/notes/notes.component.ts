import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "../login/authentication.service";
import { ActivatedRoute } from "@angular/router";
import {Note} from "../model/note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  note! :Note;

  constructor(public authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    if (this.authenticationService.getCurrentUserValue) {
      this.getNotes()
    }
  }

   getNotes() {
     this.route.params.subscribe(params => {
       const id = params["id"];
         this.http.get<Note>("api/note/" + id.toString()).subscribe((res: Note) => {
           console.log(res.notes)
           this.note = res;
           document.getElementById("notesText")!.innerHTML = res.notes
       }, error => {console.log(error)});
     });
   }

  saveNotes(notesText: string) {
    if (!this.authenticationService.getCurrentUserValue) {
      document.getElementById("errorText")!.innerHTML = "You must be logged in to save your notes!";
    } else {
      this.note.notes = notesText
      this.http.put("api/note/save", this.note).subscribe();
    }
  }
}
