import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PostTodoDTO, TODO_SERVICE_NAME, TodoServiceClient } from 'proto/todo';

@Injectable()
export class AppService implements OnModuleInit {
  private todoServiceClient: TodoServiceClient;

  constructor(@Inject('todo') private clientGrpc: ClientGrpc) {}

  // Initialize gRPC client in the onModuleInit method
  onModuleInit() {
    this.todoServiceClient = this.clientGrpc.getService<TodoServiceClient>(TODO_SERVICE_NAME);
  }

  // Method to call the gRPC postTodo service
  postTodo(postTodoDTO: PostTodoDTO) {
    return this.todoServiceClient.postTodo(postTodoDTO);
  }

  // Method to call the gRPC getTodos service
  getTodos() {
    return this.todoServiceClient.getTodos({});
  }
}
