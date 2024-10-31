import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoPublisher } from './todo.publisher';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [TodoService, TodoPublisher],
})
export class TodoModule {}
