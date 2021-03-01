import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(  private http: HttpClient ) { }

  // private quoteApiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en";
  private quoteApiUrl = environment.api + "/getQuoteRu";

  getText(language: string){
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
      return this.http.get<String>(this.quoteApiUrl, {headers: headers});
  }
}
