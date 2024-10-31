import { Injectable } from '@nestjs/common';
import { Todo, Todos, PostTodoDTO } from 'proto/todo';
import { TodoPublisher } from './todo.publisher';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'first to do',
      isDone: false,
    },
  ];

  constructor(private readonly todoPublisher: TodoPublisher) {}

  getTodos(): Todos {
    return { Todos: this.todos };
  }

  async postTodo(postTodoDTO: PostTodoDTO): Promise<Todo> {
    const todo: Todo = {
      id: this.todos.length + 1,
      description: postTodoDTO.description,
      isDone: postTodoDTO.isDone,
    };

    // Publish the todo to RabbitMQ
    await this.todoPublisher.publishTodo(todo); // Publish the todo

    this.todos.push(todo);
    return todo;
  }

  getTodo(): Todo[] {
    return this.todos;
  }
}
