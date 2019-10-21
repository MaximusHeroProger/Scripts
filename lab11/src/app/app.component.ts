import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public Sensors = [];
  public id : number;
  public name : string;
  public status : boolean;
  public newStatus :boolean;
  constructor(){
    for (let i = 0; i < 10; i++){
      this.id = i;
      this.name = `Название${i}`;
      this.status  = Math.random() < .5;
      this.Sensors[i] = new Sensor(this.id, this.name, this.status);
    }
  }
  delete(elm: HTMLDivElement){
    elm.remove();
  }
  newSensor(id: HTMLInputElement, name: HTMLInputElement){
    let sensor = new Sensor(parseInt(id.value) , name.value, this.newStatus);
    this.Sensors.push(sensor);
  }
}
class Sensor {
  public id : number;
  public name : string;
  public status : boolean;
  constructor(id : number, name : string, status : boolean){
    this.id = id;
    this.name = name;
    this.status = status;
  }
}
