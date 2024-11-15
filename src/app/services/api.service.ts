import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })

  }

  fixerApiURL = 'http://data.fixer.io/api/latest';
  accessKey = '34810515889049133248887418cc2180'; 



  constructor(private http: HttpClient) { }

  getExchangeRates(): Observable<any> {
    const url = `${this.fixerApiURL}?access_key=${this.accessKey}&symbols=USD,EUR,CLP`;
    return this.http.get(url, this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError('getExchangeRates', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log to console instead
      return of(result as T); // Devuelve un resultado vacío para mantener la aplicación funcionando
    };
  }
}
