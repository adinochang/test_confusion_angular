import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

import { Dish } from '../shared/dish';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpMsgService } from "./process-http-msg.service";


@Injectable({
  providedIn: 'root'
})

export class DishService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHttpMsgService
  ) { }

  getDishes() : Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id) : Observable<Dish>  {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish() : Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
      .pipe(map( dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds() : Observable<number[] | any> {
    return this.getDishes()
      .pipe(map( dishes => dishes.map( dish => dish.id ) ))
      .pipe(catchError(error => error));
  }
}
