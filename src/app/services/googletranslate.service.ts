import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleObj } from '../models/solution';

@Injectable({ providedIn: 'root' }) export class GoogletranslateService {

  url = 'https://translation.googleapis.com/language/translate/v2?key=';
  key = 'AIzaSyD3gsM3cVnA1ad2bH9GYxuWzSBkbCelguw';
  constructor(private http: HttpClient) { }

  translate(obj: GoogleObj) {
    return this.http.post(this.url + this.key, obj);
  }

}
