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

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  @Input() toEdit!: Todo | undefined;

  @Output() newItemEvent = new EventEmitter<Todo>();
  @Output() newEditEvent = new EventEmitter<Todo>();
  @Output() newReverseEvent = new EventEmitter<Todo>();

  newItem: Todo = {
    id: Math.floor(Math.random() * 10000).toString(16),
    name: '',
    description: '',
    deadline: new Date(),
    done: false,
  };

  todoForm = this.fb.group({
    name: ['', Validators.required],
    date: ['', this.validateDate()],
    description: ['', Validators.required],
  });

  switchValuesToEdit() {
    this.todoForm.value.name = this.toEdit!.name;
    this.todoForm.value.description = this.toEdit!.description;
  }

  validateDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let today: Date = new Date();
      if (new Date(control.value) <= today) {
        return {
          date: 'La deadline deve essere almeno il giorno successivo ad oggi',
        };
      } else return null;
    };
  }

  // name="";
  // description="";

  addNewItem() {
    this.newItem.name = this.todoForm.value.name!;
    this.newItem.description = this.todoForm.value.description!;
    this.newItemEvent.emit(this.newItem);
    console.log('Dati nel form', this.newItem);
    console.log('Reactive form values', this.todoForm.value);
  }

  ngOnInit(): void {}

  confirmEdit() {
    this.toEdit!.name = this.todoForm.value.name!;
    this.toEdit!.description = this.todoForm.value.description!;
    this.newEditEvent.emit(this.toEdit);
    console.log(this.toEdit);
  }

  reverseEdit() {
    this.toEdit = undefined;
  }
}
