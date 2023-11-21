import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Todo } from './interfaces/todo';
import { TodoService } from './services/todo.service';
import { ItemLitsComponent } from './components/item-lits/item-lits.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemLitsComponent],
  template: `
  <main>
  @defer (when todoList$) {
    <h1>Todo list</h1>
    <ul>
      @for (item of todoList$ | async; track $index) {
        <li>
          <label for="{{ item.id }}">
        <input
          id="{{ item.id }}"
          type="checkbox"
          [checked]="item.completed"
          (change)="markTaskAsDone(item)"
          [(ngModel)]="item.completed"
        />{{ item.title }}
      </label>
    </li>
    }
  </ul>
  <section>
    @if (updatedTask$ | async; as updatedTask) {
      <h2>Last updated task</h2>
      <span>{{ updatedTask.title }}</span>
    }
  </section>
}
@placeholder {
  placeholder
}
@loading(minimum 300ms) {
  loading...
}
</main>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public todoList$!: Observable<Todo[]>;
  public updatedTask$!: Observable<Todo | null>;

  todoService = inject(TodoService);

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.todoList$ = this.todoService.getTodos();
  }

  markTaskAsDone(item: Todo): void {
    this.updatedTask$ = this.todoService.updateTask(item);
  }
}
