import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

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

  onRowDrop(event: CdkDragDrop<string[]>) {
    this.moveRow(event.previousIndex, event.currentIndex - event.previousIndex);
  }

  addRow() {
    this.rows.push(this.formBuilder.control(null));
  }

  removeRow(index: number): void {
    this.rows.removeAt(index);
  }

  moveRow(index: number, steps: number): void {
    const control = this.rows.at(index);
    const newIndex = index + steps;

    this.rows.removeAt(index);
    this.rows.insert(newIndex, control);
  }

}
