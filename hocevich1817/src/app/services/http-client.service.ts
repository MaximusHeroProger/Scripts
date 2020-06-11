import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Регистрация сервиса как синглтон (доступен во всем приложении)
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  // URL сервера или файла их которого берём данные
  private baseUrl = 'http://localhost:3000/';
  // Конструктор класса, в параметрах создается объект класса HttpClient
  constructor(public http: HttpClient) { }
  // Метод для получения URL
  private getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }
  // Метод для GET запроса к серверу. Возвращает объект класса Observable. В параматры передаем URL и заголовок запроса
  public get(url: string = '', header: HttpHeaders): Observable<any> {
    // Формируем Options для запроса (добавляем заголовок)
    const requestOptions = { headers: header };
    // Выполняем и возвращаем запрос. Передаем URL (который получаем через метод getUrl) и опции
    return this.http.get(this.getUrl(url), requestOptions);
  }
  // Метод для отправки POST запроса (добавление)
  public post(url: string = '', data, header: HttpHeaders): Observable<any> {
    const requestOptions = { headers: header };
    // Помимо URL и опций, добавляем данные, которые добавляем
    return this.http.post(this.getUrl(url), data, requestOptions);
  }
  // Метод для отправики PUT запроса (изменения существующей записи)
  public put(url: string = '', data: any = {}, header: HttpHeaders): Observable<any> {
    const requestOptions = { headers: header };
    return this.http.put(this.getUrl(url), data, requestOptions);
  }
  // Метод для отправки DELETE запроса (удаления данных)
  public delete(url: string = '', header: HttpHeaders): Observable<any> {
    const requestOptions = { headers: header };
    return this.http.delete(this.getUrl(url), requestOptions);
  }
}
