import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Feedback } from "../shared/feedback";

import { baseURL } from '../shared/baseurl';
import { ProcessHttpMsgService } from "./process-http-msg.service";



@Injectable({
  providedIn: 'root'
})

export class ContactService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHttpMsgService,
  ) { }

  getFeedbacks() : Observable<Feedback[]> {
    return this.http.get<Feedback[]>(baseURL + 'feedback')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeedback(id) : Observable<Feedback>  {
    return this.http.get<Feedback>(baseURL + 'feedback/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  postFeedback(feedback: Feedback) : Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Feedback>(baseURL + 'feedback/', feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
