import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Facilities } from './admin-dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getAllFacilities(): Observable<Facilities[]> {
    return this.http.get<Facilities[]>('http://localhost:3000/facility').pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  createFacility(facility: Facilities): Observable<Facilities> {
    const userId: number = 1;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<Facilities>(
        `http://localhost:3000/facility/user/${userId}`,
        facility,
        { headers }
      )
      .pipe(
        tap((data) => console.log('createFacility: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
