import { Controller, Get } from '@nestjs/common';

@Controller()
export class DefaultController {
  @Get()
  index(): string {
    return 'Api is not used';
  }
}
