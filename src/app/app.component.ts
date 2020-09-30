import { Component } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'take-exam';
  numberOfQuestions = 40;
  arrayQuestion = [];

  submitted = false;

  onSubmit() {
    this.arrayQuestion = [];
    this.submitted = true;
    for (let i = 1; i <= this.numberOfQuestions; i++) {
      this.arrayQuestion.push({
        questionNo: i,
        answered: false,
        mark: 0,
        status: 'unchecked'
      });
    }
    console.log(this.arrayQuestion);
  }

  onCorrect(question){
    const questionIndex = this.arrayQuestion.findIndex(obj => obj.questionNo === question.questionNo);
    this.arrayQuestion[questionIndex].mark = 1;
    this.arrayQuestion[questionIndex].status = 'correct';
  }
  onWrong(question){
    const questionIndex = this.arrayQuestion.findIndex(obj => obj.questionNo === question.questionNo);
    this.arrayQuestion[questionIndex].mark = 0;
    this.arrayQuestion[questionIndex].status = 'wrong';
  }

}
