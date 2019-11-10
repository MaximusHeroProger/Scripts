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

  public newId : number;
  public newName : string;
  public newStatus : boolean;
  constructor(){
    for (let i = 0; i < 10; i++){
      this.id = i;
      this.name = `Название${i}`;
      this.status  = Math.random() < .5;
      this.Sensors[i] = new Sensor(this.id, this.name, this.status);
    }
  }
  delete(elm: HTMLDivElement, id: number){
    console.log(this.Sensors);
    this.Sensors = this.Sensors.filter(obj => obj !== this.Sensors[id]);
    elm.remove();
    console.log(this.Sensors);
  }
  newSensor(){
    let sensor = new Sensor(this.newId, this.newName, this.newStatus);
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
