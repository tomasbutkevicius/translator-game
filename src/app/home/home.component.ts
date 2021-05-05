import { Component } from '@angular/core';
import { Language } from '../models/language';
import { TranslateService } from '../services/translate.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private translateService: TranslateService) { };

  languageList: Language[];
  selectedLanguage: String;
  translatorLanguage: String;

  ngOnInit() {
    this.languageList = [];
    this.selectedLanguage = "ru";
    this.translatorLanguage = "en";
    this.getLanguages();
  }

  getLanguages(): void {
    if (localStorage.getItem('translatorLanguage')) {
      this.translatorLanguage = localStorage.getItem('translatorLanguage');
    }
    if (localStorage.getItem('selectedLanguage')) {
      this.selectedLanguage = localStorage.getItem('selectedLanguage');
    }
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
        },
          err => {
            console.log(err);
          });
    }
  }

  onLanguageSelect(selectedLanguage) {
    this.selectedLanguage = selectedLanguage;
    localStorage.setItem('selectedLanguage', selectedLanguage);
    console.log("clicked on change language");
    window.location.reload();
  }

  onTranslatorLanguageSelect(selectedLanguage) {
    this.translatorLanguage = selectedLanguage;
    localStorage.setItem('translatorLanguage', selectedLanguage);
    window.location.reload();
  }
}