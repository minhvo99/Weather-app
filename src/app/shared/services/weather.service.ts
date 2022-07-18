import { Injectable } from '@angular/core';
import { Observable,  throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Weathers } from '../models/weathers';

const httpOptions = {
  headers: new HttpHeaders({
    'X-RapidAPI-Key': '297e968fcbmsh2bcd70080924c2fp1f75d5jsnf7f299593ad2',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public baseURLs : string = `https://weatherapi-com.p.rapidapi.com`

  constructor(private http: HttpClient) { }

  getWeather(query: string): Observable<Weathers>{
    return this.http.get<Weathers>(`${this.baseURLs}/current.json?q=${query}`, httpOptions).pipe( 
      retry(3),
      catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
