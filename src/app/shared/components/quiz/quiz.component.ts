import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-quiz',
	templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {
	quiz: FormGroup = new FormGroup({
		id: new FormControl(),
		title: new FormControl(),
		description: new FormControl(),
		level: new FormControl(),
		answer: new FormControl(),
		time: new FormControl(),
	});

	levels = [
		{ label: 'easy', id: 1 },
		{ label: 'medium', id: 2 },
		{ label: 'hard', id: 3 },
	];

	@Output() sendQuiz = new EventEmitter();
	@Input() quizData: any = null;

	onSend(): void {
		const { level } = this.quiz.value;
		this.sendQuiz.emit({
			...this.quiz.value,
			level: this.levels.find((l) => l.id == level).label,
		});
	}

	ngOnInit(): void {
		if (this.quizData) {
			const { level } = this.quizData;
			this.quiz.patchValue({
				...this.quizData,
				level: this.levels.find((l) => l.label == level).id,
			});
		}
	}
}
