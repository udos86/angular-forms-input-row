import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {AppComponent} from './app.component';
import {FormComponent} from './form/form.component';
import {InputRowComponent} from './input-row/input-row.component';
import {ValidationMessageComponent} from './validation-message/validation-message.component';
import {InputSpinnerComponent} from './input-spinner/input-spinner.component';

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
