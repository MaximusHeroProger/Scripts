import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/models/note.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public notes: Note[] = []; // Создаем массив к котором хранятся объекты типа Note
  public noteForm: FormGroup; // Создаем переменную для формы, используя объект FormGroup
  public createDate = new Date();
  public completeDate = new Date();
  constructor(private notesService: NotesService, private router: Router) { // Создаем объект класса NotesService
    // Создаем форму
    this.noteForm = new FormGroup({
      // Создаем поля формы и валидаторы к ним
      id: new FormControl(null),
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      createDate: new FormControl(null, [Validators.required]),
      completeDate: new FormControl(null, [Validators.required]),
      status: new FormControl(true, [Validators.required])
    });
  }
  // Используем метод вызываемый при иницализации для получения списка заметок
  async ngOnInit() {
    try {
      const notes = await this.notesService.getNotes(); // Асинхронно получаем все заметки
      this.notes = (isNullOrUndefined(notes)) ? [] : notes; // Записываем их в массив
    } catch (e) {
      console.error(e);
    }
  }
  // Метод, который срабатывает при отправки формы
  async onNoteFormSubmit() {
    try {
      const note = this.noteForm.value; // Получаем значение из полей формы
      await this.notesService.postNote(note); // Асинхронно отпраляем данные на сервер
      await this.router.navigate(['/']);
    } catch (e) {
      console.error(e);
    }
  }
}
