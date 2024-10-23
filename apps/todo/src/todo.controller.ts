import { Controller } from '@nestjs/common';
import { TodoService } from './todo.service';
import { GrpcMethod } from '@nestjs/microservices';
import { PostTodoDTO, Todo, Todos, TodoServiceController, } from 'proto/todo';

@Controller()
export class TodoController implements TodoServiceController{
  constructor(private readonly todoService: TodoService) {}
  getTodos():  Todos {
    throw new Error('Method not implemented.');
  }
 

  @GrpcMethod('TodoService', 'PostTodo')
  postTodo(postTodoDTO: PostTodoDTO): Todo{
    return this.todoService.postTodo(postTodoDTO)
  }

  @GrpcMethod('TodoService', 'GetTodos')
  getTodo(){
    return this.todoService.getTodos()
  }
}
 