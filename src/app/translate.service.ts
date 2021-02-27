import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private translatedText: string;

  constructor() { }

  translate(typedText: string, callback){
      var data = "source=en&q=";
      data += typedText + "!&target=es";
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      var translatedTextResponse = '';
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          var data=xhr.responseText;
          var jsonResponse = JSON.parse(data);
          callback(jsonResponse);
        }
      });

      xhr.open("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");
      xhr.setRequestHeader("x-rapidapi-host", "google-translate1.p.rapidapi.com");
      xhr.setRequestHeader("x-rapidapi-key", "e65f15be4dmshce0042b5b438a1cp1fc179jsnf947a075aee4");
      // xhr.setRequestHeader("accept-encoding", "application/gzip");
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.send(data);
}

}
