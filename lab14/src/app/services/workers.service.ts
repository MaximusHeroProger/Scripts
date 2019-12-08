import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WorkersService extends HttpClientService {

  options: HttpHeaders;

  constructor(public http: HttpClient) {
    super(http);
    this.options = new HttpHeaders();
    this.options = this.options.set('Content-Type', 'application/json');
  }

  async getWorkers() {
    return this.get('workers', this.options).toPromise();
  }

  async postWorker(data) {
    return this.post('workers', data, this.options).toPromise();
  }

  async putWorkerById(id, data) {
    return this.put('workers/' + id, data, this.options).toPromise();
  }

  async deleteWorkerById(id) {
    return this.delete('workers/' + id, this.options).toPromise();
  }
}
