import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

interface Worker {
  name: string;
  surname: string;
  number: string;
  head: boolean;
}

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {
  @Input() worker: {name: string, surname: string, number: string, head: boolean};
  @Output() deletedWorker = new EventEmitter<{name: string, surname: string, number: string, head: boolean}>();
  @Output() editedWorker = new EventEmitter<{newWorker: Worker, oldWorker: Worker}>();
  public edit = false;
  workerForm: FormGroup;
  workers: Worker[] = [];
  public mask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  constructor() {
    this.workerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required, Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)]),
      head: new FormControl(false)
    });
  }

  ngOnInit() {
  }

  deleteWorker(worker) {
    this.deletedWorker.emit(worker);
  }

  editWorker(worker) {
    this.editedWorker.emit({
      newWorker: this.workerForm.value,
      oldWorker: worker
    });
    this.edit = !this.edit;
  }
}
