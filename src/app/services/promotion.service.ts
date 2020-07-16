import { Injectable } from '@angular/core';

import { Promotion } from "../shared/promotion";
import { PROMOTIONS } from "../shared/promotions";

@Injectable({
  providedIn: 'root'
})

export class PromotionService {

  constructor() { }

  getPromotions() {
    return PROMOTIONS;
  }

  getPromotion(id) {
    return PROMOTIONS.filter( (promo) => promo.id === id )[0];
  }

  getFeaturedPromotion() {
    return PROMOTIONS.filter( (promo) => promo.featured )[0];
  }
}
