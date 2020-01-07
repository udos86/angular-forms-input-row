import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {of, Subscription} from 'rxjs';
import {delay, distinctUntilChanged, filter, skip, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-input-row',
  templateUrl: './input-row.component.html',
  styleUrls: ['./input-row.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRowComponent),
      multi: true
    }
  ]
})
export class InputRowComponent implements ControlValueAccessor, OnInit, OnDestroy {

  group: FormGroup;

  field1: FormControl;
  group2: FormGroup;
  field2A: FormControl;
  field2B: FormControl;
  field3: FormControl;

  isField2Focused = false;
  isField2Loading = false;

  isField3Focused = false;
  isField3Loading = false;

  private subscriptions: Subscription[] = [];

  private onChange: (value: any) => void = () => {};

  private onTouched: () => any = () => {};

  ngOnInit() {

    this.field1 = new FormControl(null);
    this.field2A = new FormControl(null, Validators.required);
    this.field2B = new FormControl(null, Validators.required);
    this.group2 = new FormGroup({field2A: this.field2A, field2B: this.field2B}, {updateOn: 'blur'});
    this.field3 = new FormControl(null, {updateOn: 'blur'});

    this.group = new FormGroup({field1: this.field1, field2: this.group2, field3: this.field3});

    const groupChanges$ = this.group.valueChanges.pipe(
      tap(value => this.onChange(value))
    );

    const field2Changes$ = this.group2.valueChanges.pipe(
      skip(1), // skip initial setting of value
      // debounceTime(500), // only needed when update on change
      distinctUntilChanged(),
      filter(() => this.group2.valid && !this.isField3Focused),
      tap(() => this.onField3Loading()),
      switchMap(() => of(`${this.field2A.value}/${this.field2B.value}`).pipe(delay(1500))),
      tap(value => this.onField3Loaded(value))
    );

    const field3Changes$ = this.field3.valueChanges.pipe(
      skip(1), // skip initial setting of value
      // debounceTime(500), // only needed when update on change
      distinctUntilChanged(),
      filter(() => !this.isField2Focused),
      tap(() => this.onField2Loading()),
      switchMap(value => of(value).pipe(delay(1500))),
      tap(value => this.onField2Loaded(value))
    );

    this.subscriptions.push(groupChanges$.subscribe(), field2Changes$.subscribe(), field3Changes$.subscribe());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.onChange(this.group.value);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    const value = obj || {field1: null, field2: {field2A: null, field2B: null}, field3: null};
    this.group.setValue(value);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.group.disable() : this.group.enable();
  }

  showInvalid(control: AbstractControl): boolean {
    return control.touched && control.invalid;
  }

  onField2Focus() {
    this.isField2Focused = true;
  }

  onField2Blur() {
    this.isField2Focused = false;
  }

  onField2Loading() {
    this.isField2Loading = true;
    this.group2.disable({emitEvent: false});
  }

  onField2Loaded(value: any) {
    const values = value.split('/'); // !!! just a simple sample logic !!!

    this.isField2Loading = false;

    this.field2A.setValue(values[0] || null, {emitEvent: false});
    this.field2B.setValue(values[1] || null, {emitEvent: false});
    this.group2.enable({emitEvent: false}); // avoid loading cascade // see https://github.com/angular/angular/issues/25030
    this.group.updateValueAndValidity();
  }

  onField3Blur() {
    this.isField3Focused = false;
  }

  onField3Focus() {
    this.isField3Focused = true;
  }

  onField3Loading() {
    this.isField3Loading = true;
    this.field3.disable({emitEvent: false});
  }

  onField3Loaded(value: any) {
    this.isField3Loading = false;
    this.field3.setValue(value, {emitEvent: false});
    this.field3.enable({emitEvent: false}); // avoid loading cascade // see https://github.com/angular/angular/issues/25030
    this.group.updateValueAndValidity();
  }
}
