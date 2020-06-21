import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  rightAnswers: any;
  totalQuestions: any;
  result: any;
  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.rightAnswers = this.router.snapshot.queryParams.rightAnswers;
    this.totalQuestions = this.router.snapshot.queryParams.totalQuestions;
    this.result = this.router.snapshot.queryParams.result;
  }

}
