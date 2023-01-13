import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodoComponent, TodoFormComponent, TodoCardComponent],
  imports: [CommonModule, TodoRoutingModule, ReactiveFormsModule],
})
export class TodoModule {}
