import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { DepositDto, WithdrawalDto, TransferDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('deposit')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Realizar depósito' })
  @ApiResponse({ status: 201, description: 'Depósito realizado' })
  deposit(@Body() dto: DepositDto, @Request() req: any) {
    return this.transactionsService.deposit(req.user.id, dto);
  }

  @Post('withdraw')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Realizar saque' })
  @ApiResponse({ status: 201, description: 'Saque realizado' })
  withdraw(@Body() dto: WithdrawalDto, @Request() req: any) {
    return this.transactionsService.withdraw(req.user.id, dto);
  }

  @Post('transfer')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Transferir para outro usuário (por e-mail)' })
  @ApiResponse({ status: 201, description: 'Transferência realizada' })
  @ApiResponse({ status: 404, description: 'Usuário destinatário não encontrado' })
  transfer(@Body() dto: TransferDto, @Request() req: any) {
    return this.transactionsService.transfer(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar minhas transações' })
  findAll(@Request() req: any) {
    return this.transactionsService.findAll(req.user.id);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Resumo financeiro do usuário' })
  getSummary(@Request() req: any) {
    return this.transactionsService.getSummary(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar transação por ID' })
  @ApiParam({ name: 'id', description: 'ID da transação' })
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.transactionsService.findOne(id, req.user.id);
  }
}
