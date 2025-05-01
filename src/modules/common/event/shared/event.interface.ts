import { EmitMessageDto } from './event.dto';

export interface IKafkaService {
  emitMessage(payload: EmitMessageDto): Promise<any>;
}

export interface IRabbitMQService {
  emitMessage(payload: EmitMessageDto): Promise<any>;
}
