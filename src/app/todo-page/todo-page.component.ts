import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {

  todoList: Todo[] = [
    //Task di prova per test input binding
    {
      id: Math.floor(Math.random() * 10000).toString(16),
      name: "Todo 1",
      description: "Lorem ipsum dolor sit amet",
      deadline: new Date(),
      done: false
    },
    {
      id: Math.floor(Math.random() * 10000).toString(16),
      name: "Todo 2",
      description: "Lorem ipsum dolor sit amet",
      deadline: new Date(),
      done: true
    },
    {
      id: Math.floor(Math.random() * 10000).toString(16),
      name: "Todo 3",
      description: "Lorem ipsum dolor sit amet",
      deadline: new Date(),
      done: false
    },
    {
      id: Math.floor(Math.random() * 10000).toString(16),
      name: "Todo 4",
      description: "Lorem ipsum dolor sit amet",
      deadline: new Date(),
      done: true
    },
  ]

  doneList: Todo[] = this.todoList.filter(todo => todo.done === true)
  undoneList: Todo[] = this.todoList.filter(todo => todo.done === false)

  constructor() { }

  ngOnInit(): void {
  }

  
  addItem(newItem: Todo){
    let todo = newItem
    this.todoList.push(todo)
  }
  
  deleteElement(todoId: string){
    this.todoList = this.todoList.filter(todo => todo.id != todoId)
    this.doneList = this.doneList.filter(todo => todo.id != todoId)
    this.undoneList = this.undoneList.filter(todo => todo.id != todoId)
  }
  
  markDone(todo: Todo){
    todo.done = true
    console.log(todo.done)
    console.log("Done list", this.doneList)
    console.log("Undone list", this.undoneList)
  }
  
  markUndone(todo: Todo){
    todo.done = false
    console.log(todo.done)
    console.log("Done list", this.doneList)
    console.log("Undone list", this.undoneList)
  }
  
  onFilterChange(){  
  }
  
  @Input() toEdit!: Todo

  toDoCopy!:Todo

  modifyCard(todo:Todo){
    this.toDoCopy= todo;
  }

  addEditedTodo(todo :Todo){
    let index:number = this.todoList.findIndex(el => el.id === todo.id)
    this.todoList[index] = todo; 
  }

}
