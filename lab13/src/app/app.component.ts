import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface Worker {
    name: string;
    surname: string;
    number: string;
    head: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
  onWorkerFormSubmit() {
    this.workers.push(this.workerForm.value);
    this.workerForm.reset();
  }
  deleteWorker(worker) {
    const index = this.workers.indexOf(worker, 0);
    this.workers.splice(index, 1);
  }
  onEditWorker(workers) {
    const index = this.workers.indexOf(workers.oldWorker, 0);
    this.workers[index].name = workers.newWorker.name;
    this.workers[index].surname = workers.newWorker.surname;
    this.workers[index].number = workers.newWorker.number;
    this.workers[index].head = workers.newWorker.head;
  }
}
