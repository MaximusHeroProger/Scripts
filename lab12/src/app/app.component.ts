import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	workerElements = []; // массив объектов, отобращаемых при помощи компонента worker
	public index: number;

	onWorkerAdded(workerData: { name: string, role: string }) { // обработчик события workerCreated из компонента Interface
		this.workerElements.push({
			name: workerData.name,
			role: workerData.role,
			type: 'сотрудник'
			});
	}
	onHeadWorkerAdded(workerData: { name: string, role: string }) { // обработчик события headWorkerCreated из компонента Interface
		this.workerElements.push({
			name: workerData.name,
			role: workerData.role,
			type: 'руководитель'
			});
	}
	onWorkerDelete(workerName: string){
		for (let worker of this.workerElements){
			let index = this.workerElements.findIndex(worker => worker.name == workerName);
			if (index >= 0) {
				this.workerElements.splice(index, 1);
				break;
			}
		}

	}
	onWorkerEdited(workerData: {name: string, role: string, oldName: string}){
		for (let worker of this.workerElements){
			this.index = this.workerElements.findIndex(worker => worker.name == workerData.oldName);
			if (this.index >= 0) {
				this.workerElements[this.index].name = workerData.name;
				this.workerElements[this.index].role = workerData.role;
				break;
			}
		}

		
	}
}
