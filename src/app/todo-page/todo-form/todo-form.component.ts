import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { identity } from 'rxjs';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  constructor() { }

  @Input() toEdit!: Todo | undefined

  @Output() newItemEvent = new EventEmitter<Todo>()
  @Output() newEditEvent = new EventEmitter<Todo>()
  @Output() newReverseEvent = new EventEmitter<Todo>();


  newItem: Todo = {                                                                                                                                                                                                                                                                                                                                               
    id: Math.floor(Math.random() * 10000).toString(16),
    name: "",
    description: "",
    done: false
  }

  name="";
  description="";

  addNewItem(){
    this.newItemEvent.emit(this.newItem)
    console.log("Dati nel form", this.newItem)
  }

  ngOnInit(): void {
  }

  confirmEdit(){
    this.newEditEvent.emit(this.toEdit)
    console.log(this.toEdit)
  }

  reverseEdit(){
    this.toEdit = undefined
  }

}
