import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Todo } from '../../../core/models/todo';
import {
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { __values } from 'tslib';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  @Input() toEdit!: Todo | undefined;
  @Input() toModify!: Todo | undefined

  @Output() newItemEvent = new EventEmitter<Todo>();
  @Output() newEditEvent = new EventEmitter<Todo>();
  @Output() newReverseEvent = new EventEmitter<Todo>();

  
  ngOnInit(): void {} 

  todoForm = this.fb.group({
    nome: ['', Validators.required],
    date: [''],
    descrizione: ['', Validators.required],
  });

  

  // switchValuesToEdit() {
  //   this.todoForm.value.nome = this.toEdit!.nome;
  //   this.todoForm.value.descrizione = this.toEdit!.descrizione;
  // }

  // validateDate(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     let today: Date = new Date();
  //     if (new Date(control.value) <= today) {
  //       return {
  //         date: 'La deadline deve essere almeno il giorno successivo ad oggi',
  //       };
  //     } else return null;
  //   };
  // }

  addNewItem() {
    const newItem: Todo = {
      id: Math.floor(Math.random() * 10000).toString(16),
      nome: this.todoForm.value.nome!,
      descrizione: this.todoForm.value.descrizione!,
      deadline: formatDate(
        new Date(this.todoForm.controls.date.value!),
        'dd/MM/yyyy',
        'en'
      ),
      done: false,
    };

    this.newItemEvent.emit(newItem);
    console.log('Dati nel form', newItem);

    this.todoForm.controls.nome.reset();
    this.todoForm.controls.date.reset();
    this.todoForm.controls.descrizione.reset();
  }

  editForm = this.fb.group({
    nome: [this.toEdit?.nome],
    descrizione: [this.toEdit?.descrizione],
    date: [this.toEdit?.deadline]
  })

  confirmEdit() {
    this.toEdit!.nome = this.todoForm.value.nome!;
    this.toEdit!.descrizione = this.todoForm.value.descrizione!;
    (this.toEdit!.deadline = formatDate(
      new Date(this.todoForm.controls.date.value!),
      'dd/MM/yyyy',
      'en'
    )),
      this.newEditEvent.emit(this.toEdit);
    console.log(this.toEdit);
  }

  reverseEdit() {
    this.toEdit = undefined;
  }
}
