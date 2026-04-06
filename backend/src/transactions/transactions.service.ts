import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DepositDto, WithdrawalDto, TransferDto } from './dto/create-transaction.dto';

const userSelect = { select: { id: true, name: true, email: true } };

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async deposit(userId: string, dto: DepositDto) {
    return this.prisma.$transaction(async (tx) => {
      const [transaction] = await Promise.all([
        tx.transaction.create({
          data: {
            type: 'DEPOSIT',
            amount: dto.amount,
            description: dto.description ?? 'Depósito',
            userId,
          },
          include: { user: userSelect, toUser: userSelect },
        }),
        tx.user.update({
          where: { id: userId },
          data: { balance: { increment: dto.amount } },
        }),
      ]);
      return transaction;
    });
  }

  async withdraw(userId: string, dto: WithdrawalDto) {
    return this.prisma.$transaction(async (tx) => {
      const [transaction] = await Promise.all([
        tx.transaction.create({
          data: {
            type: 'WITHDRAWAL',
            amount: dto.amount,
            description: dto.description ?? 'Saque',
            userId,
          },
          include: { user: userSelect, toUser: userSelect },
        }),
        tx.user.update({
          where: { id: userId },
          data: { balance: { decrement: dto.amount } },
        }),
      ]);
      return transaction;
    });
  }

  async transfer(userId: string, dto: TransferDto) {
    const toUser = await this.prisma.user.findUnique({ where: { email: dto.toEmail } });
    if (!toUser) throw new NotFoundException('Usuário destinatário não encontrado');
    if (toUser.id === userId) throw new BadRequestException('Não é possível transferir para si mesmo');

    return this.prisma.$transaction(async (tx) => {
      const [transaction] = await Promise.all([
        tx.transaction.create({
          data: {
            type: 'TRANSFER',
            amount: dto.amount,
            description: dto.description ?? 'Transferência',
            userId,
            toUserId: toUser.id,
          },
          include: { user: userSelect, toUser: userSelect },
        }),
        tx.user.update({ where: { id: userId }, data: { balance: { decrement: dto.amount } } }),
        tx.user.update({ where: { id: toUser.id }, data: { balance: { increment: dto.amount } } }),
      ]);
      return transaction;
    });
  }

  findAll(userId: string) {
    return this.prisma.transaction.findMany({
      where: { OR: [{ userId }, { toUserId: userId }] },
      include: { user: userSelect, toUser: userSelect },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id, OR: [{ userId }, { toUserId: userId }] },
      include: { user: userSelect, toUser: userSelect },
    });
    if (!transaction) throw new NotFoundException(`Transação ${id} não encontrada`);
    return transaction;
  }

  async getSummary(userId: string) {
    const [user, transactions] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId }, select: { balance: true } }),
      this.prisma.transaction.findMany({
        where: { OR: [{ userId }, { toUserId: userId }] },
        select: { type: true, amount: true },
      }),
    ]);

    const sum = (type: string) =>
      transactions.filter((t) => t.type === type).reduce((s, t) => s + Number(t.amount), 0);

    return {
      balance: Number(user?.balance ?? 0),
      totalTransactions: transactions.length,
      totalDeposits: sum('DEPOSIT'),
      totalWithdrawals: sum('WITHDRAWAL'),
      totalTransfers: sum('TRANSFER'),
    };
  }
}
