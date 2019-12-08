import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

interface Worker {
  id: number,
  name: string;
  surname: string;
  number: string;
  status: boolean;
}

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {
  @Input() worker: {id: number, name: string, surname: string, number: string, status: boolean};
  @Output() deletedWorker = new EventEmitter<{id: number, name: string, surname: string, number: string, status: boolean}>();
  @Output() editedWorker = new EventEmitter<{id: number, name: string, surname: string, number: string, status: boolean}>();
  public id;
  public name;
  public surname;
  public number;
  public status;
  public edit = false;
  workerForm: FormGroup;
  workers: Worker[] = [];
  public mask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  constructor() {
    this.workerForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required, Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)]),
      status: new FormControl()
    });
  }

  ngOnInit() {
  this.id = this.worker.id;
  this.name = this.worker.name;
  this.surname = this.worker.surname;
  this.number = this.worker.number;
  this.status = this.worker.status;
  }

  deleteWorker(worker) {
    this.deletedWorker.emit(worker);
  }

  editWorker() {
    this.editedWorker.emit(this.workerForm.value);
    this.edit = !this.edit;
  }
}
