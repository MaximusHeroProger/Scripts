import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {WorkersService} from '../services/workers.service';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public workers: Worker[] = [];
  public workerForm: FormGroup;
  public maxDate = new Date();
  public mask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  constructor(private workersService: WorkersService, private router: Router) {
    this.workerForm = new FormGroup({
      id: new FormControl(),
      lastname: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required, Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      DOB: new FormControl(null, [Validators.required, this.dateValidator]),
      department: new FormControl(null, [Validators.required])
    });
  }

  async ngOnInit() {
    try {
      const workers = await this.workersService.getWorkers();
      this.workers = (isNullOrUndefined(workers)) ? [] : workers;
    } catch (err) {
      console.log(err);
    }
  }
  async onWorkerFormSubmit() {
    try {
      const worker = this.workerForm.value;
      await this.workersService.postWorker(worker);
      await this.router.navigate(['/view']);
    } catch (err) {
      console.log(err);
    }
  }
  private dateValidator(control: FormControl): ValidationErrors {
    const date = new Date(control.value).getTime();
    const nowDate = new Date().getTime();
    if (date > nowDate) {
      return { invalidPassword: 'Дата рождения не может быть в будующем' };
    }
    return null;
  }
}
