import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../../core/models/todo';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {

  @Input() todo!: Todo

  @Output() delete = new EventEmitter<string>()

  @Output() modify = new EventEmitter<Todo>()

  constructor() { }

  ngOnInit(): void {
  }

  deleteElement(){
    this.delete.emit(this.todo.id)
  }

  editElement(){
    this.modify.emit(JSON.parse(JSON.stringify(this.todo)))
    console.log("Modificato", JSON.parse(JSON.stringify(this.todo)))
  }

  taskCompleted(){
    !this.todo.done ? this.todo.done = true : this.todo.done = false
    console.log(this.todo)
  }


}
