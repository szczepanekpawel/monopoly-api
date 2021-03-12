import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EventsModule } from './modules/events/events.module';
import { ApiModule } from './modules/api/api.module';
import { GameModule } from './modules/game/game.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
    EventsModule,
    ApiModule,
    GameModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
