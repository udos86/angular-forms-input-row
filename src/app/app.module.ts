import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormComponent} from './form/form.component';
import {InputRowComponent} from './input-row/input-row.component';
import {ValidationMessageComponent} from './validation-message/validation-message.component';
import { InputSpinnerComponent } from './input-spinner/input-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    InputRowComponent,
    ValidationMessageComponent,
    InputSpinnerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [ValidationMessageComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
