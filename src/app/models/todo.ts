export class Todo {
    id: string;
    name: string = "";
    description: string = "";
    done: boolean = false;

    constructor(todo?: Partial<Todo>){
        this.id = Math.floor(Math.random() * 10000).toString(16),
        Object.assign(this, todo)
    }
}
