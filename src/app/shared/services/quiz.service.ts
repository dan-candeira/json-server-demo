import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URI = environment.api_url;

@Injectable({ providedIn: 'root' })
export class QuizService {
	constructor(private http: HttpClient) {}

	loadQuizzes(): Observable<any> {
		return this.http.get(`${URI}/quizzes`);
	}

	loadQuiz(id: string): Observable<any> {
		return this.http.get(`${URI}/quizzes/${id}`);
	}

	createQuizzes(body: any): Observable<any> {
		return this.http.post(`${URI}/quizzes`, body);
	}

	editQuizzes(body: any): Observable<any> {
		return this.http.put(`${URI}/quizzes/${body.id}`, body);
	}

	deleteQuiz(id: string): Observable<any> {
		return this.http.delete(`${URI}/quizzes/${id}`);
	}
}
