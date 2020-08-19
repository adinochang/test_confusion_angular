import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs';
import {delay, catchError, map} from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Leader } from "../shared/leader";

import { baseURL } from '../shared/baseurl';
import { ProcessHttpMsgService } from "./process-http-msg.service";
import {Dish} from "../shared/dish";



@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHttpMsgService,
  ) { }

  getLeaders() : Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id) : Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader() : Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true')
      .pipe(map( leaders => leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
