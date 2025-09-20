import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGreetingMessage(): string {
    return 'Hello! Welcome - PURE HOME WATERS';
  }
}
