import { Component, OnInit } from '@angular/core';
import { WorkersService } from '../services/workers.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public workers: Worker[] = [];
  constructor(private workersService: WorkersService) { }
  async ngOnInit() {
    try {
      const workers = this.workersService.getWorkers();
      this.workers = (isNullOrUndefined(await workers)) ? [] : await workers;
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
}
