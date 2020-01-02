import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  group: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.group = this.formBuilder.group({
      rows: this.formBuilder.array([this.formBuilder.control(null)])
    });
  }

  get rows(): FormArray {
    return this.group.get('rows') as FormArray;
  }

  addRow() {
    this.rows.push(this.formBuilder.control(null));
  }

  removeRow(index: number) {
    this.rows.removeAt(index);
  }
}
