import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizService } from 'src/app/shared/services/quiz.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class EditComponent implements OnInit, OnDestroy {
	quiz: any;
	subs = new Subscription();

	constructor(
		private quizService: QuizService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.subs.add(
			this.route.params.subscribe((params) => {
				this.quizService.loadQuiz(params['id']).subscribe((resp) => {
					this.quiz = resp;
				});
			})
		);
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

	onSendForm(data: any): void {
		this.quizService.editQuizzes(data).subscribe(() => {});
	}
}
