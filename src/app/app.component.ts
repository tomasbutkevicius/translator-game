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

  compare() {
    let similarity = this.similarity(this.randomTextTranslated, this.typedText);

    if(similarity > 0.8){
      return "correct";
    }

    if (similarity < 0.5) {
      return 'incorrect';
    }

    return 'partialy-correct';

  }

  similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
  }

  editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  exit() {
    window.location.reload();
  }

  translateRandomText() {
    this.translateService.translate(this.randomText, this.randomTextLanguage, "en")
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
