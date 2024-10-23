import { Injectable } from '@nestjs/common';
import { connect } from 'amqplib';

@Injectable()
export class TodoPublisher {
  private channel: any;

  // Initialize connection to RabbitMQ
  async onModuleInit() {
    const connection = await connect('amqp://localhost:5672');
    this.channel = await connection.createChannel();
    await this.channel.assertQueue('todos'); // Ensure the queue exists
  }

  // Publish todo to the RabbitMQ queue
  async publishTodo(todo: any) {
    this.channel.sendToQueue('todos', Buffer.from(JSON.stringify(todo)));
    console.log(`Todo published: ${JSON.stringify(todo)}`);
  }
}
