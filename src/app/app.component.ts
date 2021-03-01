import { Component, OnInit } from '@angular/core';
import { lorem } from 'faker';
import { from } from 'rxjs';

import {Languages} from './classes/languages';
import { TranslateService } from './services/translate.service';
import {QuoteService} from './services/quote-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private translateBtn: any;
  private translateService: TranslateService;
  

  constructor(private quoteService: QuoteService){};

  listLanguages: Languages[];
  randomText = '';

  ngOnInit(){
    this.translateService = new TranslateService();
    this.translateBtn = document.getElementById('translatebtn');
    this.getQuotes();
  }
    
  typedText = '';
  translatedText = '';
  title = 'translateGame';

  getQuotes(): void {
    this.quoteService.getText("en")
    .subscribe((data) => {
      this.randomText = data["quoteText"];
    });
  }

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

    translate(){
      this.translateService.translate(this.typedText, this.handleTranslate);
    }

    handleTranslate(jsonResponse: JSON){
      console.log(jsonResponse["data"]);
    }
}
