import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class QuoteService {

  constructor(  private http: HttpClient ) { }

  getText(){
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
      return this.http.get("http://127.0.0.1:3000/quote");
  }
}
