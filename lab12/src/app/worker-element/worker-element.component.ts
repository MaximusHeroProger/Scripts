import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-worker-element',
	templateUrl: './worker-element.component.html',
	styleUrls: ['./worker-element.component.css']
})
export class WorkerElementComponent {
	@Input() worker: {name: string, type: string, role: string};
	@Output() workerEdited = new EventEmitter<{name: string, role: string, oldName: string}>();
	@Output() workerDeleted = new EventEmitter<string>();
	public toggleEdit = true;
	
	constructor() {};

	workerDelete(workerName: string){
		this.workerDeleted.emit(workerName);
	}
	editedWorker(nameInput: string, roleInput: string, workerName: string){
		this.toggleEdit = true;
		this.workerEdited.emit({
			name: nameInput,
			role: roleInput,
			oldName: workerName
		});
	}
}