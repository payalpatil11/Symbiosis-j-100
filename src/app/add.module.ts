import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(HttpClientModule)]
  }).catch(err => console.error(err));

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
