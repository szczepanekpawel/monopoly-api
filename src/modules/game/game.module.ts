import { Module } from '@nestjs/common';
import { GameLogicProvider } from './providers/game-logic.provider';

@Module({
  providers: [GameLogicProvider],
  exports: [GameLogicProvider],
})
export class GameModule {}
