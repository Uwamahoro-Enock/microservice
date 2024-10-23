import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TodoConsumer } from './todo.consumer'; // Adjust the path as necessary

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'todo',
        transport: Transport.GRPC,
        options: {
          protoPath: join(__dirname, '../todo.proto'),
          package: 'todo',
        },
      },
      {
        name: 'TODO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], 
          queue: 'todos', //
          queueOptions: {
            durable: false, 
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, TodoConsumer], // Add the RabbitMQ consumer service
})
export class AppModule {}
