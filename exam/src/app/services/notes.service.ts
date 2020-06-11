import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientService } from './http-client.service';

// Регистрация сервиса как синглтон (доступен во всем приложении)
@Injectable({
  providedIn: 'root'
})
// Наследуем от класса HttpClientService
export class NotesService extends HttpClientService {
  options: HttpHeaders; // Создаем переменную для опций запроса
  constructor(public http: HttpClient) {
    super(http); // Передаем в конструтор HttpClientService объект класса HttpClient
    this.options = new HttpHeaders(); // Создаем объект класса HttpHeaders
    this.options = this.options.set('Content-Type', 'application/json'); // Устанавливает значение заголовка для запросов
  }
  // Метод получения всех заметок. Используется async, так как метод this.get возвращает объект класса Observable
  async getNotes() {
    // toPromise() используется для преобразования объект класса Observable в Promise
    return this.get('notes', this.options).toPromise();
  }
  // Метод для получения определенной заметки по id
  async getNoteById(id) {
    return this.get('notes/' + id, this.options).toPromise();
  }
  // Метод для вставки новой заметки
  async postNote(data) {
    return this.post('notes', data, this.options).toPromise();
  }
  // Метод для изменения заметки
  async putNoteById(id, data) {
    return this.put('notes/' + id, data, this.options).toPromise();
  }
  // Метод для удаления заметки
  async deleteNoteById(id) {
    return this.delete('notes/' + id, this.options).toPromise();
  }
}
