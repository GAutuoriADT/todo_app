import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodo(){
    return this.http.get<Todo[]>(`${environment.BASE_URL}/todo`)
  }

  postTodo(body: Todo){
    return this.http.post<Todo>(`${environment.BASE_URL}/todo`, body)
  }

  updateTodo(body: Todo, todoId: string){
    return this.http.put<Todo>(`${environment.BASE_URL}/todo/${todoId}`, body)
  } 

  deleteTodo(todoId: string){
    return this.http.delete<Todo>(`${environment.BASE_URL}/todo/${todoId}`)
  }
}
