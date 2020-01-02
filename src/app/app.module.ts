import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FormComponent } from './form/form.component';
import { InputRowComponent } from './input-row/input-row.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    InputRowComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
