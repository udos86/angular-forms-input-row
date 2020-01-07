import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormComponent} from './form/form.component';
import {InputRowComponent} from './input-row/input-row.component';
import {ValidationMessageComponent} from './validation-message/validation-message.component';
import {InputSpinnerComponent} from './input-spinner/input-spinner.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [],
  entryComponents: [ValidationMessageComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
