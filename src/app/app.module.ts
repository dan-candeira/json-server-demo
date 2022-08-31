import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './view/home/home.component';
import { EditComponent } from './view/edit/edit.component';
import { CreateComponent } from './view/create/create.component';
import { SharedModule } from './shared/shared.module';
@NgModule({
	declarations: [AppComponent, HomeComponent, EditComponent, CreateComponent],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
