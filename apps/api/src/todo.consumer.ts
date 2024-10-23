import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect } from 'amqplib';

@Injectable()
export class TodoConsumer implements OnModuleInit {
  private channel: any;

  async onModuleInit() {
    const connection = await connect('amqp://localhost:5672');
    this.channel = await connection.createChannel();
    await this.channel.assertQueue('todos');

    // Consume messages
    this.channel.consume('todos', (message) => {
      if (message) {
        const todo = JSON.parse(message.content.toString());
        console.log(`Received todo: ${JSON.stringify(todo)}`);
        // Handle the todo (e.g., save it to your database)
        this.channel.ack(message); 
      }
    });
  }
}
