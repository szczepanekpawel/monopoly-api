import { Module } from '@nestjs/common';
import { DefaultController } from './controllers/default.controller';

@Module({
  controllers: [DefaultController],
})
export class ApiModule {}
