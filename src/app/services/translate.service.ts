import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LanguageResponse } from '../models/languageResponse';

//https://rapidapi.com/googlecloud/api/google-translate1

  const httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded',
      'x-rapidapi-key': 'e65f15be4dmshce0042b5b438a1cp1fc179jsnf947a075aee4',
      'x-rapidapi-host':  'google-translate1.p.rapidapi.com',
      "useQueryString": 'true'
    })
  };

  const httpAudioOptions = {
    headers: new HttpHeaders({
      'x-rapidapi-key': 'e65f15be4dmshce0042b5b438a1cp1fc179jsnf947a075aee4',
      'x-rapidapi-host':  'google-translate1.p.rapidapi.com',
      "useQueryString": 'true'
    })
  };


@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  constructor(private http: HttpClient) { }

  translate(text: string, source: string, target: string) {
    var data = "q=" + text + "&";
    var data = data + "source=" + source + "&";
    data = data + "!&target=" + target;
    return this.http.post("https://google-translate1.p.rapidapi.com/language/translate/v2 ", data, httpOptions);
  }
  
  getLanguages(){
    return this.http.get<LanguageResponse>("https://google-translate1.p.rapidapi.com/language/translate/v2/languages ", httpOptions);
  }

}
