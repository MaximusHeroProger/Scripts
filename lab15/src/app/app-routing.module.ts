import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {EditWorkerComponent} from './edit-worker/edit-worker.component';
import {AddWorkerComponent} from './add-worker/add-worker.component';
import {MainComponent} from './main/main.component';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'add', component: AddWorkerComponent},
  {path: 'edit/:id', component: EditWorkerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
