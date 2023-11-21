import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  pageNumber: number = 1;
  recordLimit: number = 10;
  getTasksUrl: string = `https://jsonplaceholder.typicode.com/todos?_page=${this.pageNumber}&_limit=${this.recordLimit}`;
  updateTaskUrl: string = `https://jsonplaceholder.typicode.com/todos/`;

  http = inject(HttpClient);

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.getTasksUrl).pipe(catchError((err: unknown): Observable<[]> => of([])));
  }

  updateTask(task: Todo): Observable<Todo | null> {
    return this.http.put<Todo>(`${this.updateTaskUrl}${task.id}`, task).pipe(catchError((err: unknown): Observable<null> => of(null)))
  }
}
