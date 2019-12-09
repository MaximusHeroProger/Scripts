import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WorkersService } from '../services/workers.service';
import { isNullOrUndefined } from 'util';

interface Worker {
  id: number;
  name: string;
  surname: string;
  number: string;
  status: boolean;
}

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit {
  public workers: Worker[] = [];
  public workerForm: FormGroup;
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
}
