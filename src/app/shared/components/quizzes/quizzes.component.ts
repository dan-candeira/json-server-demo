import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class QuizzesComponent {
  @Input() quizzes: any;

  @Output() deleteQuiz = new EventEmitter();

  onDeleteQuiz(event: string) {
    this.deleteQuiz.emit(event);
  }
}
