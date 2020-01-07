import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {rowAnim} from './animations';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  animations: [rowAnim]
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

  onRowDrop(event: CdkDragDrop<string[]>) {
    this.moveRow(event.previousIndex, event.currentIndex - event.previousIndex);
  }

  addRow() {
    this.rows.push(this.formBuilder.control(null));
  }

  insertRow(index: number) {
    this.rows.insert(index, this.formBuilder.control(null));
  }

  removeRow(index: number): void {
    this.rows.removeAt(index);
  }

  moveRow(index: number, steps: number): void {
    const control = this.rows.at(index);

    let newIndex = index + steps;

    if (newIndex < 0) {
      newIndex = this.rows.length;

    } else if (newIndex >= this.rows.length) {
      newIndex = 0;
    }

    this.rows.removeAt(index);
    this.rows.insert(newIndex, control);
  }
}
