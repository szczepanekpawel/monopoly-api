import { Module } from '@nestjs/common';
import { EventController } from './events/controllers/event.controller';

@Module({
  imports: [],
  controllers: [EventController],
  providers: [],
})
export class AppModule {}
