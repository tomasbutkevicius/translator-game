import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

  const httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded',
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

}
