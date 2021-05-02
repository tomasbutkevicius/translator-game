import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { Language } from '../models/language';
import { TranslateService } from '../services/translate.service';
import { QuoteService } from '../services/quote-service.service';

@Component({
  selector: 'game-component',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private showTranslationBtn: any;

  constructor(private quoteService: QuoteService, private translateService: TranslateService, private changeDetectorRef: ChangeDetectorRef) { };

  languageList: Language[];
  randomText = '';
  typedText = '';
  randomTextTranslated = '';
  @Input() selectedLanguage: string;
  @Input() translatorLanguage: string;
  title = 'translateGame';
  pageLoaded = false;
  showTranslation = false;
  challangeComplete = false;


  ngOnInit() {
    this.showTranslationBtn = document.getElementById('showTranslationButton');
    // this.getLanguages();
    this.getRandomText();
    this.pageLoaded = true;
  }

  getRandomText(): void {
    this.quoteService.getText()
      .subscribe((data) => {
        this.setRandomText(data["quoteText"], "ru", this.selectedLanguage);
        this.setRandomTextTranslation(data["quoteText"]);
        this.changeDetectorRef.detectChanges();
      });
  }

  private setRandomText(text, source, target) {
    if(source === target){
      this.randomText = text;
    } else {
        this.translateService.translate(text, source, target)
      .subscribe((data) => {
        this.randomText = data["data"]["translations"][0]["translatedText"];
      },
        err => {
          console.log(err);
        });
    }
  }

  private setRandomTextTranslation(text) {
    if(this.translatorLanguage === "ru"){
      this.randomTextTranslated = text;
    } else {
    this.translateService.translate(text, "ru", this.translatorLanguage)
      .subscribe((data) => {
        this.randomTextTranslated = data["data"]["translations"][0]["translatedText"];
        this.changeDetectorRef.detectChanges();
      },
        err => {
          this.randomText = "Никто не может грустить, когда у него есть воздушный шарик.";
          this.randomTextTranslated = "No one can be sad when they have a balloon. (Error occurred. Make sure server is running)";
          console.log(err);
        });
    }
  }

  onInput(value: string) {
    this.typedText = value;
  }

  onShowTranslationBtnClick(){
    this.showTranslation = !this.showTranslation;
  }

  compare() {
    let similarity = this.similarity(this.randomTextTranslated, this.typedText);

    if (similarity > 0.8) {
      if(this.randomTextTranslated.length !== 0 && this.typedText.length !== 0){
        this.challangeComplete = true;
      }
      return "correct";
    }
    
    this.challangeComplete = false;

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
