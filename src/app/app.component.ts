import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Language } from './models/language';
import { TranslateService } from './services/translate.service';
import { QuoteService } from './services/quote-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private translateBtn: any;

  constructor(private quoteService: QuoteService, private translateService: TranslateService, private changeDetectorRef: ChangeDetectorRef) { };

  languageList: Language[];
  randomText = '';
  typedText = '';
  randomTextTranslated = '';
  randomTextLanguage = "";
  title = 'translateGame';
  pageLoaded = false;


  ngOnInit() {
    this.languageList = [];
    this.translateBtn = document.getElementById('translatebtn');
    this.getLanguages();
    this.getRandomText();
    console.log(this.languageList);
    this.pageLoaded = true;
  }

  getRandomText(): void {
    this.quoteService.getText()
      .subscribe((data) => {
        this.randomText = data["quoteText"];
        this.translateRandomText();
        this.changeDetectorRef.detectChanges();
      });
  }

  getLanguages(): void {
    this.randomTextLanguage = "ru";
    if (localStorage.getItem("languages")) {
      this.languageList = JSON.parse(localStorage.getItem("languages"));
    } else {
      this.translateService.getLanguages()
        .subscribe((response) => {
          console.log("got languages from api");
          console.log(response.data.languages);
          response.data.languages.forEach((language) => {
            this.languageList.push({ code: language.language });
            localStorage.setItem('languages', JSON.stringify(this.languageList));
          });
          this.changeDetectorRef.detectChanges();
        },
          err => {
            console.log(err);
          });
    }
  }

  onLanguageSelect(selectedLanguage) {
    this.changeLanguageOfRandomText(selectedLanguage);
    this.randomTextLanguage = selectedLanguage;
    localStorage.setItem('randomTextLanguage', selectedLanguage);
    console.log("clicked on change language");
  }

  changeLanguageOfRandomText(languageCode: string) {
    this.translateService.translate(this.randomText, this.randomTextLanguage, languageCode)
      .subscribe((data) => {
        this.randomText = data["data"]["translations"][0]["translatedText"];
        this.changeDetectorRef.detectChanges();
      },
        err => {
          console.log(err);
        });
  }

  translateRandomText() {
    this.translateService.translate(this.randomText, this.randomTextLanguage, "en")
      .subscribe((data) => {
        this.randomTextTranslated = data["data"]["translations"][0]["translatedText"];
        this.changeDetectorRef.detectChanges();
      },
        err => {
          this.randomText = "Никто не может грустить, когда у него есть воздушный шарик.";
          this.randomTextTranslated = "No one can be sad when they have a balloon.";
          console.log(err);
        });
  }

  onInput(value: string) {
    this.typedText = value;
  }

  compare() {
    let similarity = this.similarity(this.randomTextTranslated, this.typedText);

    if (similarity > 0.8) {
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

  private editDistance(s1, s2) {
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


}
