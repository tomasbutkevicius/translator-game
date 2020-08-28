import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class freeApiService{

    constructor(private httpClient: HttpClient){};

    getComments(): Observable<any>{
        return this.httpClient.get("https://google-translate1.p.rapidapi.com/language/translate/v2/languages", {
            "headers": {
                "x-rapidapi-host": "google-translate1.p.rapidapi.com",
                "x-rapidapi-key": "e65f15be4dmshce0042b5b438a1cp1fc179jsnf947a075aee4",
                "accept-encoding": "application/gzip"
            }
        });
    }
}