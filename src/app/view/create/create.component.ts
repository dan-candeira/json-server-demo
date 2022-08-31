import { Component } from '@angular/core';
import { QuizService } from 'src/app/shared/services/quiz.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
	constructor(private quizService: QuizService) {}

	onSendForm(data: any): void {
		console.log(data);
		this.quizService.createQuizzes(data).subscribe(() => {});
	}
}
