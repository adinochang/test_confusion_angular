import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from "../services/dish.service";

import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { switchMap } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Comment } from "../shared/comment";


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})



export class DishdetailComponent implements OnInit {
  @Input()

  dish : Dish;
  dishIds: string[];
  prev: string;
  next: string;

  commentsForm: FormGroup;
  comment: Comment;

  formErrors = {
    'rating': '',
    'comment': '',
    'author': ''
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
    },
    'comment': {
      'required':      'Comment is required.',
    },
    'rating': {
      'required':      'Rating is required.',
    },
  };

  @ViewChild('cform') commentsFormDirective;



  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb:FormBuilder
  ) {
    this.createForm();
  }


  ngOnInit() {
    this.dishService.getDishIds().subscribe(
      dishIds => {
        this.dishIds = dishIds;
      }
    );

    this.route.params.pipe(
      switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });

  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);

    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack() : void {
    this.location.back();
  }



  createForm() {
    this.commentsForm = this.fb.group({
      rating: [5, [Validators.required,] ],
      comment: ['', [Validators.required] ],
      author: ['', [Validators.required, Validators.minLength(2)] ],
    });

    this.commentsForm.valueChanges
       .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentsForm) { return; }
    const form = this.commentsForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentsForm.value;
    this.comment.date = new Date().toISOString();

    this.dish.comments .push(this.comment);

    this.commentsFormDirective.resetForm();

    this.commentsForm.reset({
      rating: 5,
      comment: '',
      author: '',
    });
  }

}
