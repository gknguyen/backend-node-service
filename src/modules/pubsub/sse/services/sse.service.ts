import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Subject } from 'rxjs';
import { IMessageEvent } from '../shared/interface';

@Injectable()
export class SseService implements OnModuleDestroy {
  private readonly subjects: Map<string, Subject<IMessageEvent>> = new Map();

  addChannel(channelId: string, subject: Subject<IMessageEvent>) {
    this.subjects.set(channelId, subject);
  }

  removeChannel(channelId: string) {
    this.subjects.delete(channelId);
  }

  pushDataToChannel(channelId: string, data: any) {
    const subject = this.subjects.get(channelId);
    if (subject) subject.next({ data });
  }

  onModuleDestroy() {
    this.subjects.clear();
  }
}
