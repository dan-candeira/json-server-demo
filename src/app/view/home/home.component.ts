import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QuizService } from 'src/app/shared/services/quiz.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
	quizzes;

	constructor(private quizService: QuizService) {
		this.loadQuizzes();
	}

	onDelete(id: string): void {
		this.quizService.deleteQuiz(id).subscribe(() => {});
		this.loadQuizzes();
	}

	loadQuizzes(): void {
		this.quizService.loadQuizzes().subscribe((quizzes) => {
			this.quizzes = quizzes;
		});
	}
}
