import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Todo } from "../../interfaces/todo";

@Component({
  selector: 'app-item-lits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <label for="{{ todoItem.id }}">
  <input
    id="{{ todoItem.id }}"
    type="checkbox"
    [checked]="todoItem.completed"
    (change)="markTaskAsDone.emit(todoItem)"
    [(ngModel)]="todoItem.completed"
  />{{ todoItem.title }}
</label>
  `,
  styleUrl: './item-lits.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemLitsComponent {
  @Input() todoItem!: Todo;
  @Output() markTaskAsDone: EventEmitter<Todo> = new EventEmitter<Todo>();
}
