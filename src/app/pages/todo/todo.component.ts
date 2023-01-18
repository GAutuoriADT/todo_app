import { Component, OnInit , Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/core/service/todo.service';
import { Todo } from '../../core/models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private todoApi: TodoService
  ) { }
  
  @Input() toEdit!: Todo
  @Input() todoCopy!: Todo

  todoList?: Todo[]

  ngOnInit(): void {
    this.todoApi.getTodo()
    .subscribe(response => this.todoList = response)
  }

  addItem(newItem: Todo){
    let todo = newItem
    console.log("New Item in todo", newItem)
    this.todoApi.postTodo(todo)
    .subscribe(response => this.todoApi.getTodo().subscribe(response => this.todoList = response))
  }

  toModify!: Todo

  modifyCard(todo: Todo){
    this.todoCopy = this.toModify
  }

  // updateItem(todoId: string, todo: Todo){
  //   this.todoApi.updateTodo(todo)
  //   .subscribe
  // }

  deleteItem(todoId: string){
    this.todoList?.filter(todo => todo.id != todoId)
    this.todoApi.deleteTodo(todoId)
    .subscribe(response => this.todoApi.getTodo().subscribe(response => this.todoList = response))
  }

}
