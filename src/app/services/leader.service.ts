import { Injectable } from '@angular/core';

import { Leader } from "../shared/leader";
import { LEADERS } from "../shared/leaders";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  constructor() { }

  getLeaders() {
    return LEADERS;
  }

  getLeader(id) {
    return LEADERS.filter( (leader : Leader) => leader.id === id )[0];
  }

  getFeaturedLeader() {
    return LEADERS.filter( (leader : Leader) => leader.featured )[0];
  }
}
