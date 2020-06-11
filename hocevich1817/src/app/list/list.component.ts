import { Component, OnInit } from '@angular/core';
import {WorkersService} from '../services/workers.service';
import {isNullOrUndefined} from 'util';
import {Worker} from '../shared/models/worker.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public workers: Worker[] = [];
  public search = '';
  public idFlag = 1;
  public ageFlag = 1;
  constructor(private workersService: WorkersService) {}
  async ngOnInit() {
    try {
      const workers = await this.workersService.getWorkers();
      this.workers = (isNullOrUndefined(workers)) ? [] : workers;
      for (const worker of this.workers) {
        // @ts-ignore
        worker.DOB = this.getAge(worker.DOB);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async deleteWorker(id) {
    try {
      await this.workersService.deleteWorkerById(id);
      this.idFlag = 1;
      this.ageFlag = 1;
      this.ngOnInit();
    } catch (err) {
      console.log(err);
    }
  }
  getAge(DOB) {
    // @ts-ignore
    // tslint:disable-next-line:no-bitwise
    return ((new Date().getTime() - new Date(DOB)) / (24 * 3600 * 365.25 * 1000)) | 0;
  }
  idSort(workers, idFlag) {
    if (idFlag === 2) { // По убыванию id
      this.idFlag = 3;
      this.ageFlag = 1;
      this.workers = workers.sort((a, b) => {
        return a.id - b.id;
      });
    } else if (idFlag === 3) { // По возратсанию id
      this.idFlag = 2;
      this.ageFlag = 1;
      this.workers = workers.sort((a, b) => {
        return b.id - a.id;
      });
    }
  }
  ageSort(workers, ageFlag) {
    if (ageFlag === 2) { // По убыванию возраста
      this.ageFlag = 3;
      this.idFlag = 1;
      this.workers = workers.sort((a, b) => {
        return a.DOB - b.DOB;
      });
    } else if (ageFlag === 3) { // По возратсанию возраста
      this.ageFlag = 2;
      this.idFlag = 1;
      this.workers = workers.sort((a, b) => {
        return b.DOB - a.DOB;
      });
    }
  }
}
