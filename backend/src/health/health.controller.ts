import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Verifica status da aplicação' })
  check() {
    return {
      status: 'ok',
      service: 'bank-challenge-api',
      uptime: process.uptime(),
    };
  }
}
