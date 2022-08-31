import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { QuizzesComponent } from './quizzes/quizzes.component';

@NgModule({
	declarations: [QuizComponent, QuizzesComponent],
	exports: [QuizComponent, QuizzesComponent],
	imports: [BrowserModule, FormsModule, RouterModule, ReactiveFormsModule],
})
export class ComponentsModule {}
