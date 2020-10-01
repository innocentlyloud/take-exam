import { Component, TemplateRef } from '@angular/core';
import { Hero } from './hero';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'take-exam';
  numberOfQuestions = 40;
  arrayQuestion = [];
  topic = '';
  modalRef: BsModalRef;

  submitted = false;
  correctAnswer = [];
  wrongAnswer = [];
  unanswered = [];

  constructor(private modalService: BsModalService) {}
  onSubmit() {
    this.arrayQuestion = [];
    this.submitted = true;
    for (let i = 1; i <= this.numberOfQuestions; i++) {
      this.arrayQuestion.push({
        questionNo: i,
        answered: false,
        mark: 0,
        status: 'unanswered'
      });
    }
    console.log(this.arrayQuestion);
  }

  onCorrect(question) {
    const questionIndex = this.arrayQuestion.findIndex(obj => obj.questionNo === question.questionNo);
    this.arrayQuestion[questionIndex].mark = 1;
    this.arrayQuestion[questionIndex].status = 'correct';
  }
  onWrong(question) {
    const questionIndex = this.arrayQuestion.findIndex(obj => obj.questionNo === question.questionNo);
    this.arrayQuestion[questionIndex].mark = 0;
    this.arrayQuestion[questionIndex].status = 'wrong';
  }
  onAnswer(question) {
    const questionIndex = this.arrayQuestion.findIndex(obj => obj.questionNo === question.questionNo);
    this.arrayQuestion[questionIndex].mark = 0;
    this.arrayQuestion[questionIndex].status = 'answered';
  }
  openModal(template: TemplateRef<any>) {
    this.arrayQuestion.forEach(item => {
      if (item.status === 'wrong') {
        this.wrongAnswer.push(item.questionNo);
      } else if (item.status === 'correct') {
        this.correctAnswer.push(item.questionNo);
      } else {
        this.unanswered.push(item.questionNo);
      }
    });
    this.modalRef = this.modalService.show(template);
  }

}
