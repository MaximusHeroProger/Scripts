import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Worker} from '../shared/models/worker.model';
import {WorkersService} from '../services/workers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public selectedWorker: Worker;
  workerForm: FormGroup;
  public mask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  constructor(private workersService: WorkersService, private activatedRouter: ActivatedRoute, private router: Router) {
    this.workerForm = new FormGroup({
      id: new FormControl(),
      lastname: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required, Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      DOB: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required])
    });
  }

  async ngOnInit() {
    try {
      let id;
      this.activatedRouter.params.subscribe(param => {
        id = param.id;
      });
      const selectedWorker = await this.workersService.getWorkerById(id);
      this.selectedWorker = (isNullOrUndefined(selectedWorker)) ? [] : selectedWorker;
      this.workerForm.patchValue({id: this.selectedWorker.id, lastname: this.selectedWorker.lastname, name: this.selectedWorker.name,
        surname: this.selectedWorker.surname, number: this.selectedWorker.number, email: this.selectedWorker.email, DOB: this.selectedWorker.DOB, department: this.selectedWorker.department});
    } catch (e) {
      console.log(e);
    }
  }
  async onWorkerFormSubmit() {
    try {
      await this.workersService.putWorkerById(this.workerForm.value.id, this.workerForm.value);
      await this.router.navigate(['/view']);
    } catch (err) {
      console.log(err);
    }
  }
  async deleteWorker(id) {
    try {
      await this.workersService.deleteWorkerById(id);
      await this.router.navigate(['/view']);
    } catch (err) {
      console.log(err);
    }
  }
}
