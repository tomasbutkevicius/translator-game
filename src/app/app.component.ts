import { Component, OnInit } from '@angular/core';
import { lorem } from 'faker';
import { freeApiService } from './services/freeapi.service';

import {Languages} from './classes/languages';
import { GoogletranslateService } from './services/googletranslate.service';
import { GoogleObj } from './models/solution';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private translateBtn: any;
  constructor(private google: GoogletranslateService){};

  listLanguages: Languages[];

  ngOnInit(){
    // this.freeApiService.getComments().subscribe(
    //   data=>{
    //     this.listLanguages = data.languages;
    //   }
    // );
    this.translateBtn = document.getElementById('translatebtn');
  }

  send() {
    const googleObj: GoogleObj = {
        q: ['hello'],
        target: 'es'
     };

      this.translateBtn.disabled = true;

      this.google.translate(googleObj).subscribe(
          (res: any) => {
          this.translateBtn.disabled = false;
          console.log(res.data.translations[0].translatedText)
          },
          err => {
            console.log(err);
          }
        );
    }

    sendTwo(){
      var data = "source=en&q=Hello%2C%20world!&target=es";

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          //YAS THIS WORKS
          console.log(this.responseText);
        }
      });

      xhr.open("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");
      xhr.setRequestHeader("x-rapidapi-host", "google-translate1.p.rapidapi.com");
      xhr.setRequestHeader("x-rapidapi-key", "e65f15be4dmshce0042b5b438a1cp1fc179jsnf947a075aee4");
      // xhr.setRequestHeader("accept-encoding", "application/gzip");
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

      xhr.send(data);
    }
    
  randomText = lorem.sentence();
  typedText = '';

  title = 'translateGame';

  onInput(value: string){
    this.typedText = value;
  }

  compare(randomLetter: string, enteredLetter: string){
    if(!enteredLetter){
      return 'pending';
    }

    if(enteredLetter === randomLetter){
      return 'correct';
    }

    return randomLetter === enteredLetter ? 'correct' : 'incorrect';

  }

  exit(){
    window.location.reload();
  }

}