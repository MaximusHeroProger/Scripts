import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WorkersService } from './services/workers.service';
import { isNullOrUndefined } from 'util';

interface Worker {
  id: number;
  name: string;
  surname: string;
  number: string;
  status: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public workerForm: FormGroup;
  public workers: Worker[] = [];
  public mask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  constructor(private workersService: WorkersService) {
    this.workerForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required, Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)]),
      status: new FormControl(false)
    });
  }
  async ngOnInit() {
    try {
      const workers = this.workersService.getWorkers();
      this.workers = (isNullOrUndefined(await workers)) ? [] : await workers;
    } catch (err) {
      console.log(err);
    }
  }
  async onWorkerFormSubmit() {
    try {
      const worker = this.workerForm.value;
      await this.workersService.postWorker(worker);
      this.workerForm.reset();
      this.ngOnInit();
    } catch (err) {
      console.log(err);
    }
  }
  async deleteWorker(worker) {
    try {
      await this.workersService.deleteWorkerById(worker.id);
      this.ngOnInit();
    } catch (err) {
      console.log(err);
    }
  }
  async onEditWorker(worker) {
    try {
      await this.workersService.putWorkerById(worker.id, worker);
      this.ngOnInit();
    } catch (err) {
      console.log(err);
    }
  }
}
