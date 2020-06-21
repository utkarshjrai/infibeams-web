import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { UserStoreService } from '../user-store.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;
  form: FormGroup;
  allQuestions: any;
  displayQuestions = [];
  isDisabled = true;
  totalQuestions: any;
  topicList: any = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'javascript' }
  ];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userStore: UserStoreService,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.user = this.userStore.user;
    this.getQuestion();
    this.form = this.formBuilder.group({
      topic: this.formBuilder.array([], [Validators.required])
    });

  }

  getQuestion() {
    this.httpClient.get('assets/data.json').subscribe(y => {
      this.allQuestions = y;
    });
  }

  onCheckboxChange(e) {
    const topic: FormArray = this.form.get('topic') as FormArray;

    if (e.target.checked) {
      topic.push(new FormControl(e.target.value));
    } else {
      const index = topic.controls.findIndex(x => x.value === e.target.value);
      topic.removeAt(index);
    }
  }

  submit() {
    const combinedQuest = [];
    this.form.value.topic.map((x: any) => {
      const selected = this.allQuestions[x];
      combinedQuest.push(selected);
    });
    this.displayQuestions = combinedQuest;
  }

  onCheckboxChangeForOptions( userSelection, topicIndex, questionIndex) {
    this.isDisabled = false;
    this.allQuestions[this.topicList[topicIndex].name][questionIndex].options.map((val: any) => {
      val.isChecked = false;
    });
    this.allQuestions[this.topicList[topicIndex].name][questionIndex].options[userSelection].isChecked = true;
  }

  submitTest() {
    const final = [];
    this.displayQuestions.map((val: any) => {
      this.totalQuestions = val.length;
      val.map((x: any) => {
        x.options.map((y: any, index) => {
          if (x.answer === index && y.isChecked) {
            final.push(y);
          }
        });
      });
    });
    const resultObj: any = {
      rightAnswers: final.length,
      totalQuestions: this.totalQuestions,
    };
    if ((this.totalQuestions / 100) * final.length > 40) {
      resultObj.result = 'pass';
    } else {
      resultObj.result = 'fail';
    }
    this.router.navigate(['/result'], {queryParams: resultObj});
  }

  logOut() {
    this.authService.signOut();
  }
}
