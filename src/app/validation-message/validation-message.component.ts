import {Component, HostBinding, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
})
export class ValidationMessageComponent {

  @HostBinding('class.invalid-feedback') get invalid() { return this.control.invalid; }

  @Input() control: AbstractControl;
}
