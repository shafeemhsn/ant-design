import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  Activity,
  Cities,
  CourtTypes,
  Courts,
  Facilities,
  UserEmails,
} from './admin-dashboard.component';
import { FacilityHomepage } from '../sport-filter/sport-filter.component';
import {
  CourtDetails,
  CourtSchedule,
  DataToGetSlots,
} from '../cout-page/cout-page.component';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getCourtAvailability(date: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<CourtSchedule>(`http://localhost:3000/data/court`, date, {
        headers,
      })
      .pipe(
        // tap((data) =>
        //   console.log('getCourtAvailability: ' + JSON.stringify(data))
        // ),
        catchError(this.handleError)
      );
  }

  getCourtPageById(courtId: number): Observable<CourtDetails> {
    return this.http
      .get<CourtDetails>(`http://localhost:3000/court/page/${courtId}`)
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError)
      );
  }

  getAllCitiesForDropDown(): Observable<Cities[]> {
    return this.http
      .get<Cities[]>('http://localhost:3000/location/cities')
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError)
      );
  }

  getAllFacilitiesForHomePage(): Observable<FacilityHomepage[]> {
    return this.http
      .get<FacilityHomepage[]>('http://localhost:3000/facility/homepage')
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError)
      );
  }

  getAllFacilities(): Observable<Facilities[]> {
    return this.http.get<Facilities[]>('http://localhost:3000/facility').pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  getAllCourtTypes(): Observable<CourtTypes[]> {
    return this.http
      .get<CourtTypes[]>('http://localhost:3000/court/types')
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError)
      );
  }

  getAllUsersEmail(): Observable<UserEmails[]> {
    return this.http
      .get<UserEmails[]>('http://localhost:3000/auth/emails')
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.handleError)
      );
  }

  getAllCourtActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>('http://localhost:3000/activity').pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError)
    );
  }

  createFacility(facility: Facilities): Observable<Facilities> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<Facilities>(`http://localhost:3000/facility`, facility, {
        headers,
      })
      .pipe(
        tap((data) => console.log('createFacility: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createCourt(court: Courts): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<Courts>(`http://localhost:3000/court`, court, {
        headers,
      })
      .pipe(
        tap((data) => console.log('createCourt: ' + JSON.stringify(data))),
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
