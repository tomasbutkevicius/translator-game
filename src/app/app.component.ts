import { Component, OnInit } from '@angular/core';
import { lorem } from 'faker';

import {Languages} from './classes/languages';
import { TranslateService } from './translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private translateBtn: any;
  private translateService: TranslateService;

  constructor(){};

  listLanguages: Languages[];

  ngOnInit(){
    this.translateService = new TranslateService();
    this.translateBtn = document.getElementById('translatebtn');
  }


    
  randomText = lorem.sentence();
  typedText = '';
  translatedText = '';
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

    translate(){
      this.translateService.translate(this.typedText, this.handleTranslate);
    }

    handleTranslate(jsonResponse: JSON){
      console.log(jsonResponse["data"]);
    }
}
