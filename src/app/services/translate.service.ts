import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageResponse } from '../models/languageResponse';


@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  constructor(private http: HttpClient) { }

  translate(text: string, source: string, target: string) {
    let data = {
      q: text,
      target: target,
      source: source
    };
    return this.http.post("http://127.0.0.1:3000/translate", data);
  }

  getLanguages() {
    return this.http.get<LanguageResponse>("http://127.0.0.1:3000/languages");
  }
}
