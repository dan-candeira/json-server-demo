import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './view/create/create.component';
import { EditComponent } from './view/edit/edit.component';

import { HomeComponent } from './view/home/home.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'quiz/:id', component: EditComponent },
	{ path: 'quiz', component: CreateComponent },
	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
