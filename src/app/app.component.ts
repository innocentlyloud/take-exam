import { Component, TemplateRef, OnInit } from '@angular/core';
import { Hero } from './hero';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'take-exam';
  numberOfQuestions = 40;
  arrayQuestion = [];
  topic = '';
  modalRef: BsModalRef;

  submitted = false;
  correctAnswer = [];
  wrongAnswer = [];
  unanswered = [];
  myStorage = window.localStorage;
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
    if (this.myStorage.getItem('questionans')) {
      this.arrayQuestion = JSON.parse(this.myStorage.getItem('questionans'));
      this.submitted = true;
    }
    if (this.myStorage.getItem('topic')) {
      this.topic = this.myStorage.getItem('topic');
    }
  }

  onSubmit() {
    this.myStorage.setItem('topic', this.topic);
    this.arrayQuestion = [];
    this.submitted = true;
    for (let i = 1; i <= this.numberOfQuestions; i++) {
      this.arrayQuestion.push({
        questionNo: i,
        answered: false,
        mark: 0,
        status: 'unanswered',
        selectedOptions: 0
      });
    }
    console.log(this.arrayQuestion);
  }

  onCorrect(question) {
    const questionIndex = this.arrayQuestion.findIndex(obj => obj.questionNo === question.questionNo);
    this.arrayQuestion[questionIndex].mark = 1;
    this.arrayQuestion[questionIndex].status = 'correct';
    this.myStorage.setItem('questionans', JSON.stringify(this.arrayQuestion));
  }
  onWrong(question) {
    const questionIndex = this.arrayQuestion.findIndex(obj => obj.questionNo === question.questionNo);
    this.arrayQuestion[questionIndex].mark = 0;
    this.arrayQuestion[questionIndex].status = 'wrong';
    this.myStorage.setItem('questionans', JSON.stringify(this.arrayQuestion));
  }
  onAnswer(question, selectedOptions) {
    const questionIndex = this.arrayQuestion.findIndex(obj => obj.questionNo === question.questionNo);
    this.arrayQuestion[questionIndex].mark = 0;
    this.arrayQuestion[questionIndex].status = 'answered';
    this.arrayQuestion[questionIndex].selectedOptions = selectedOptions;
    this.myStorage.setItem('questionans', JSON.stringify(this.arrayQuestion));
  }
  openModal(template: TemplateRef<any>) {
    this.wrongAnswer = [];
    this.correctAnswer = [];
    this.unanswered = [];
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
    this.myStorage.setItem('questionans', JSON.stringify(this.arrayQuestion));
  }
  reset() {
    this.myStorage.clear();
  }

}
