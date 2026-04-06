import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTransactions, useDeposit, useWithdrawal, useTransfer } from '../../hooks/useTransactions'
import { Card, CardHeader, CardBody } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import { TransactionBadge } from '../../components/ui/Badge'
import { PageSpinner } from '../../components/ui/Spinner'
import { formatCurrency, formatDate } from '../../lib/utils'
import type { DepositForm, WithdrawalForm, TransferForm } from '../../types'

type ModalType = 'deposit' | 'withdraw' | 'transfer' | null

const amountSchema = z
  .number({ invalid_type_error: 'Informe um valor' })
  .positive('Valor deve ser positivo')

const depositSchema = z.object({
  amount: amountSchema,
  description: z.string().optional(),
})

const withdrawSchema = depositSchema

const transferSchema = z.object({
  toEmail: z.string().email('E-mail inválido'),
  amount: amountSchema,
  description: z.string().optional(),
})

export function TransactionsPage() {
  const [modal, setModal] = useState<ModalType>(null)
  const { data: transactions, isLoading } = useTransactions()
  const deposit = useDeposit()
  const withdrawal = useWithdrawal()
  const transfer = useTransfer()

  const depositForm = useForm<DepositForm>({ resolver: zodResolver(depositSchema) })
  const withdrawForm = useForm<WithdrawalForm>({ resolver: zodResolver(withdrawSchema) })
  const transferForm = useForm<TransferForm>({ resolver: zodResolver(transferSchema) })

  function closeModal() {
    setModal(null)
    depositForm.reset()
    withdrawForm.reset()
    transferForm.reset()
  }

  if (isLoading) return <PageSpinner />

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => setModal('deposit')}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Depósito
        </Button>
        <Button variant="secondary" onClick={() => setModal('withdraw')}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
          </svg>
          Saque
        </Button>
        <Button variant="ghost" onClick={() => setModal('transfer')}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
          Transferência
        </Button>
      </div>

      <Card>
        <CardHeader
          title="Histórico de Transações"
          description={`${transactions?.length ?? 0} registros`}
        />
        {transactions?.length === 0 ? (
          <CardBody>
            <p className="py-8 text-center text-sm text-gray-400">Nenhuma transação registrada ainda.</p>
          </CardBody>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Parte</th>
                  <th className="px-6 py-3">Descrição</th>
                  <th className="px-6 py-3 text-right">Valor</th>
                  <th className="px-6 py-3 text-right">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transactions?.map((tx) => (
                  <tr key={tx.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <TransactionBadge type={tx.type} />
                    </td>
                    <td className="px-6 py-3">
                      {tx.type === 'TRANSFER' && tx.toUser ? (
                        <div>
                          <p className="font-medium text-gray-900">Para {tx.toUser.name}</p>
                          <p className="text-xs text-gray-400">{tx.toUser.email}</p>
                        </div>
                      ) : (
                        <p className="font-medium text-gray-900">{tx.user.name}</p>
                      )}
                    </td>
                    <td className="px-6 py-3 text-gray-500">{tx.description ?? '—'}</td>
                    <td className="px-6 py-3 text-right">
                      <span className={`font-semibold ${tx.type === 'DEPOSIT' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {tx.type === 'DEPOSIT' ? '+' : '-'} {formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right text-gray-400">{formatDate(tx.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Deposit */}
      <Modal open={modal === 'deposit'} onClose={closeModal} title="Realizar Depósito">
        <form
          onSubmit={depositForm.handleSubmit(async (data) => {
            await deposit.mutateAsync(data)
            closeModal()
          })}
          className="space-y-4"
        >
          <Input
            label="Valor (R$)"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0,00"
            required
            error={depositForm.formState.errors.amount?.message}
            {...depositForm.register('amount', { valueAsNumber: true })}
          />
          <Input
            label="Descrição"
            placeholder="Opcional"
            {...depositForm.register('description')}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={closeModal}>Cancelar</Button>
            <Button type="submit" loading={deposit.isPending}>Depositar</Button>
          </div>
        </form>
      </Modal>

      {/* Withdraw */}
      <Modal open={modal === 'withdraw'} onClose={closeModal} title="Realizar Saque">
        <form
          onSubmit={withdrawForm.handleSubmit(async (data) => {
            await withdrawal.mutateAsync(data)
            closeModal()
          })}
          className="space-y-4"
        >
          <Input
            label="Valor (R$)"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0,00"
            required
            error={withdrawForm.formState.errors.amount?.message}
            {...withdrawForm.register('amount', { valueAsNumber: true })}
          />
          <Input
            label="Descrição"
            placeholder="Opcional"
            {...withdrawForm.register('description')}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={closeModal}>Cancelar</Button>
            <Button type="submit" variant="danger" loading={withdrawal.isPending}>Sacar</Button>
          </div>
        </form>
      </Modal>

      {/* Transfer */}
      <Modal open={modal === 'transfer'} onClose={closeModal} title="Transferir para outro usuário">
        <form
          onSubmit={transferForm.handleSubmit(async (data) => {
            await transfer.mutateAsync(data)
            closeModal()
          })}
          className="space-y-4"
        >
          <Input
            label="E-mail do destinatário"
            type="email"
            placeholder="destino@email.com"
            required
            error={transferForm.formState.errors.toEmail?.message}
            {...transferForm.register('toEmail')}
          />
          <Input
            label="Valor (R$)"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0,00"
            required
            error={transferForm.formState.errors.amount?.message}
            {...transferForm.register('amount', { valueAsNumber: true })}
          />
          <Input
            label="Descrição"
            placeholder="Opcional"
            {...transferForm.register('description')}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={closeModal}>Cancelar</Button>
            <Button type="submit" loading={transfer.isPending}>Transferir</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
