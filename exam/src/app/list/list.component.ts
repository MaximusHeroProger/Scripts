import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Note } from '../shared/models/note.model';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public typeSort = true;
  public notes: Note[] = []; // Создаем массив, в котором хранятся элементы типа Note
  public currentDate = new Date().getTime();
  // В конструкторе создаем объект класса NotesService
  constructor(private notesService: NotesService) {}
  // Функция асинхронна, так как в самой функции используем await
  async ngOnInit() {
    // Конструкцию try, catch используем для ловли ошибок при запросах к серверу
    try {
      const notes = await this.notesService.getNotes(); // Запрашиваем все заметки
      // Если заметок нет, то передаем пустой массив. Если есть, то передаем их.
      // await используется, чтобы дождаться ответа сервера, а только потом выполнять следующий код.
      this.notes = (isNullOrUndefined(notes)) ? [] : notes;
    } catch (err) {
      // Если при работе с сервером были ошибки, то они выводятся к консоль
      console.log(err);
    }
    this.checkDates();
  }
  async deleteNoteById(id) {
    try {
      await this.notesService.deleteNoteById(id);
      this.ngOnInit();
    } catch (err) {
      console.log(err);
    }
  }
  checkDates() {
    for (const note of this.notes) {
      const completeDate = new Date(note.completeDate).getTime();
      const nowDate = new Date().getTime();
      note.status = completeDate > nowDate;
    }
  }
  createSort(notes: Note[]) {
    this.typeSort = true;
    this.notes = notes.sort((a, b) => {
        return new Date(a.createDate).getTime() - new Date(b.createDate).getTime();
    });
  }
  completeSort(notes: Note[]) {
    this.typeSort = false;
    this.notes = notes.sort((a, b) => {
      return new Date(a.completeDate).getTime() - new Date(b.completeDate).getTime();
    });
  }
}
