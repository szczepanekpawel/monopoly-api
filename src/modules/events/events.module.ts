import { Module } from '@nestjs/common';
import { EventsGateway } from './providers/event.gateway';
import { GameModule } from '../game/game.module';

@Module({
  providers: [EventsGateway],
  imports: [GameModule],
})
export class EventsModule {}
