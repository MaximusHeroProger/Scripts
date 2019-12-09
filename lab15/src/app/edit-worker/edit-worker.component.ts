import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import {WorkersService} from '../services/workers.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-worker',
  templateUrl: './edit-worker.component.html',
  styleUrls: ['./edit-worker.component.css']
})
export class EditWorkerComponent implements OnInit {
  public id;
  public name;
  public surname;
  public number;
  public status;
  public selectedWorker;
  workerForm: FormGroup;
  public mask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  constructor(private workersService: WorkersService, private activatedRouter: ActivatedRoute,
              private router: Router) {
    this.workerForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required, Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)]),
      status: new FormControl()
    });
  }

  async ngOnInit() {
    try {
      this.activatedRouter.params.subscribe(param => {
        this.id = param.id;
      });
      const selectedWorker = this.workersService.getWorkerById(this.id);
      this.selectedWorker = (isNullOrUndefined(await selectedWorker)) ? [] : await selectedWorker;
      this.id = this.selectedWorker.id;
      this.name = this.selectedWorker.name;
      this.surname = this.selectedWorker.surname;
      this.number = this.selectedWorker.number;
      this.status = this.selectedWorker.status;
    } catch (e) {
      console.log(e);
    }
  }
  async editWorker() {
    try {
      console.log(this.workerForm.value);
      await this.workersService.putWorkerById(this.workerForm.value.id, this.workerForm.value);
      this.workerForm.reset();
    } catch (err) {
      console.log(err);
    }
  }
}

