import { Component, OnInit } from '@angular/core';
import { lorem } from 'faker';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { Languages } from './classes/languages';
import { TranslateService } from './services/translate.service';
import { QuoteService } from './services/quote-service.service';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private translateBtn: any;

  constructor(private quoteService: QuoteService, private translateService: TranslateService) { };

  listLanguages: Languages[];
  randomText = '';
  typedText = '';
  randomTextTranslated = '';
  randomTextLanguage = "ru";
  title = 'translateGame';


  ngOnInit() {
    this.translateBtn = document.getElementById('translatebtn');
    this.getRandomText();
  }

  getRandomText(): void {
    this.quoteService.getText()
      .subscribe((data) => {
        this.randomText = data["quoteText"];
        this.translateRandomText();
      });
  }

  onInput(value: string) {
    this.typedText = value;
  }

  compare(randomLetter: string, enteredLetter: string) {
    if (!enteredLetter) {
      return 'pending';
    }

    if (enteredLetter === randomLetter) {
      return 'correct';
    }

    return randomLetter === enteredLetter ? 'correct' : 'incorrect';

  }

  exit() {
    window.location.reload();
  }

  translateRandomText() {
    this.translateService.translate(this.randomText)
    .subscribe((data) => {
      this.randomTextTranslated = data["data"]["translations"][0]["translatedText"];
    },
    err => {
      this.randomText = "Никто не может грустить, когда у него есть воздушный шарик.";
      this.randomTextTranslated = "No one can be sad when they have a balloon.";
      console.log(err);
    });
  }

  // translateTypedText() {
  //   this.translateService.translate(this.typedText, this.handleTranslate);
  // }

  handleTranslate(jsonResponse: JSON) {
    console.log(jsonResponse["data"]["translations"]);
  }
}
