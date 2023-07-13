import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.css']
})
export class DefinitionComponent implements OnInit {

  data: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  getDef(word: string) {
    let definitionText = document.getElementById("definitionText")
    if (word.trim() === "") {
      definitionText!.innerHTML = "Empty input, try again!";
      return;
    }
    this.http.get("/api/definition?word=" + word).subscribe(data => {
      this.data = JSON.parse(JSON.stringify(data));
      let POF = this.data[0]["meanings"][0]["partOfSpeech"]; // noun, verb, exclamation etc
      let num_of_defs = this.data[0]["meanings"][0]["definitions"].length; // num of POF's of the first type found in JSON

      // First definition
      let definition = this.data[0]["meanings"][0]["definitions"][0]["definition"];
      definitionText!.innerHTML = "1. " + POF + "<br>" + definition;

      // If another definition exists
      if (num_of_defs >= 2) {
        let definition2 = this.data[0]["meanings"][0]["definitions"][1]["definition"];
        definitionText!.innerHTML += "<br><br>" + "2. " + POF + "<br>" + definition2;

        // If a third one of other type (noun, verb etc) exists then we'll prefer that one for variation
        if (this.data[0]["meanings"].length >= 2) {
          let definition3 = this.data[0]["meanings"][1]["definitions"][0]["definition"];
          let POF_other = this.data[0]["meanings"][1]["partOfSpeech"];
          definitionText!.innerHTML += "<br><br>" + "3. " + POF_other + "<br>" + definition3;

        // Else if third one of same type exists
        } else if (num_of_defs >= 3) {
          let definition3 = this.data[0]["meanings"][0]["definitions"][2]["definition"];
          definitionText!.innerHTML += "<br><br>" + "3. " + POF + "<br>" + definition3;
        }
      }
    }, () => {
      definitionText!.innerHTML = "Found no results, sorry!";
    });
  }
}
