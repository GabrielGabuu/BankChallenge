import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class DepositDto {
  @ApiProperty({ example: 500.0 })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiPropertyOptional({ example: 'Salário' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class WithdrawalDto {
  @ApiProperty({ example: 200.0 })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiPropertyOptional({ example: 'Conta de luz' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class TransferDto {
  @ApiProperty({ example: 'destino@email.com' })
  @IsEmail()
  toEmail: string;

  @ApiProperty({ example: 150.0 })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiPropertyOptional({ example: 'Divisão de conta' })
  @IsString()
  @IsOptional()
  description?: string;
}
