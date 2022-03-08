import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NqiResponse } from '../interfaces/nqi-response';

@Injectable({
  providedIn: 'root'
})
export class SolrApiService {

  solrUrl = 'https://onestop.mhesi.go.th/nqi-solr/search';

  constructor(
    private http: HttpClient
  ) { }

  search(query: string, start: number, rows: number): Observable<NqiResponse> {

    const queryUrl = this.solrUrl + `?q=${query}&start=${start}&rows=${rows}`;

    return this.http.get<NqiResponse>(queryUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}

