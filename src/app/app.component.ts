import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['../scss/styles.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
	title = 'json-server-demo';
}
